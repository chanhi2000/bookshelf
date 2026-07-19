---
lang: en-US
title: "How to Build a Real-Time Object Detection and Tracking Pipeline with ROS 2 and YOLOv11"
description: "Article(s) > How to Build a Real-Time Object Detection and Tracking Pipeline with ROS 2 and YOLOv11"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Real-Time Object Detection and Tracking Pipeline with ROS 2 and YOLOv11"
    - property: og:description
      content: "How to Build a Real-Time Object Detection and Tracking Pipeline with ROS 2 and YOLOv11"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-real-time-object-detection-and-tracking-pipeline-with-ros-2-and-yolov11.html
prev: /programming/py/articles/README.md
date: 2026-07-25
isOriginal: false
author:
  - name: Iyanuoluwa Enoch Oke
    url: https://freecodecamp.org/news/author/iyanuoluwa007/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d07478f7-e6cf-420c-bcd2-a4b09417e9fb.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Real-Time Object Detection and Tracking Pipeline with ROS 2 and YOLOv11"
  desc="If you've ever tried to build a robotics system that can actually see, track, and respond to the world around it, you know that the hard part isn't training a detection model. The hard part is making "
  url="https://freecodecamp.org/news/how-to-build-a-real-time-object-detection-and-tracking-pipeline-with-ros-2-and-yolov11"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d07478f7-e6cf-420c-bcd2-a4b09417e9fb.png"/>

If you've ever tried to build a robotics system that can actually see, track, and respond to the world around it, you know that the hard part isn't training a detection model. The hard part is making that model run reliably inside a real robotic software stack, in real time, without falling apart the moment hardware constraints or timing issues enter the picture.

In this tutorial, you'll build a complete real-time object detection and tracking pipeline using ROS 2 and YOLOv11. You'll learn how to publish camera frames from a simulator into ROS 2, run YOLO inference in a dedicated thread, integrate ByteTrack for multi-object tracking across frames, and export your model to ONNX for faster inference on constrained hardware.

By the end of this article, you'll understand not just how to wire these tools together, but why each architectural decision matters for a perception system that's meant to work in production, not just in a notebook.

Here's what we will cover:

::: note Prerequisites

Before following along, you should be comfortable with the following:

- **Python 3.10 or later:** All code in this tutorial is written in Python.
- **Basic ROS 2 knowledge:** You should understand what nodes, topics, publishers, and subscribers are. If you're new to ROS 2, the official [<VPIcon icon="fas fa-globe"/>ROS 2 documentation](https://docs.ros.org/en/humble/index.html) is a good starting point.
- **Familiarity with PyTorch and object detection concepts:** You don't need to have trained a YOLO model yourself, but you should understand what inference means and what a bounding box detection output looks like.
- **A working ROS 2 Humble installation** on Ubuntu 22.04.
- **A GPU is recommended** for real-time inference, though the pipeline will still run on CPU at reduced frame rates.
- **CARLA Simulator (optional):** The camera publisher section uses CARLA. If you don't have CARLA installed, you can substitute any ROS 2-compatible camera source, such as a webcam node or a bag file playback.

:::

---

## What We Are Building and Why

A perception pipeline is the part of a robotic system responsible for understanding what's in the environment around the robot. It takes raw sensor data, usually camera frames, and converts them into structured information: where objects are, what they are, and how they're moving.

This tutorial builds a perception pipeline with four distinct layers:

1. **Camera ingestion** captures raw image frames from a simulator and publishes them as ROS 2 messages so the rest of the robotics stack can consume them.
2. **Object detection** runs YOLOv11 on each incoming frame to identify objects and their locations with confidence scores.
3. **Multi-object tracking** uses ByteTrack to associate detections across frames, giving each object a stable identity over time rather than treating every frame as a fresh scene.
4. **Validation and optimisation** adds a confidence gating layer that prevents low-quality detections from reaching downstream navigation logic, and exports the model to ONNX for faster inference on edge hardware.

We're using CARLA as the simulator because it provides realistic sensor data, a controllable environment, and Python-accessible camera actors, making it a natural fit for autonomous vehicle and mobile robot perception research. If you're using a different sensor source, the ROS 2 architecture is identical and only the camera publisher node needs to change.

---

## Project Structure

Before writing any code, it helps to see the full project layout. Here's what the completed workspace looks like:

```sh title="file structure"
ros2_perception_ws/
├── src/
│   └── perception_stack/
│       ├── perception_stack/
│       │   ├── __init__.py
│       │   ├── camera_publisher.py      # Publishes CARLA frames into ROS 2
│       │   ├── perception_node.py       # Threaded YOLO inference node
│       │   ├── tracker.py               # ByteTrack integration
│       │   ├── validator.py             # Confidence gating layer
│       │   └── export_onnx.py           # ONNX export script
│       ├── models/
│       │   └── yolov11n.pt              # Downloaded YOLO weights
│       ├── package.xml
│       ├── setup.py
│       └── setup.cfg
├── requirements.txt
└── README.md
```

Each file has a single responsibility. This separation matters for robotics software in particular, because perception, tracking, and validation evolve at different rates and need to be testable in isolation.

---

## How to Set Up Your ROS 2 Workspace

Create the workspace and package:

```sh
mkdir -p ~/ros2_perception_ws/src
cd ~/ros2_perception_ws/src
ros2 pkg create --build-type ament_python perception_stack
cd ~/ros2_perception_ws
colcon build
source install/setup.bash
```

`colcon build` compiles the workspace. Sourcing <VPIcon icon="fas fa-folder-open"/>`install/`<VPIcon icon="iconfont icon-shell"/>`setup.bash` makes ROS 2 aware of your new package so you can run its nodes with `ros2 run`.

---

## How to Install Dependencies

```sh
pip install ultralytics opencv-python-headless cv_bridge \
torch torchvision onnx onnxruntime-gpu \
numpy supervision
```

A note on providers: this tutorial uses ONNX Runtime with GPU support via `onnxruntime-gpu`. If you're running on a machine without a CUDA-compatible GPU, replace that with `onnxruntime` for CPU-only inference. The rest of the pipeline is unchanged, but expect lower frame rates.

---

## How to Publish Camera Frames into ROS 2

The first node bridges the gap between CARLA's Python API and the ROS 2 ecosystem. CARLA uses an event-driven callback system. ROS 2 uses a publisher-subscriber model with typed message formats. This node converts CARLA's raw image format into a `sensor_msgs/Image` message that any ROS 2 node can subscribe to.

Create <VPIcon icon="fa-brands fa-python"/>`camera_publisher.py`:

```py :collapsed-lines title="camera_publisher.py"
import carla
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import numpy as np

class CARLACameraNode(Node):
    def __init__(self):
        super().__init__('carla_camera_node')
        self.publisher = self.create_publisher(Image, '/carla/camera/rgb', 10)
        self.bridge = CvBridge()
        self.get_logger().info('CARLA camera node started.')

    def camera_callback(self, image):
        # CARLA raw data is BGRA, we convert to BGR for OpenCV compatibility
        array = np.frombuffer(image.raw_data, dtype=np.uint8)
        array = array.reshape((image.height, image.width, 4))
        bgr = array[:, :, :3]

        msg = self.bridge.cv2_to_imgmsg(bgr, encoding='bgr8')

        # Stamp the message with the current ROS 2 clock time.
        # This is critical. Downstream nodes like trackers and SLAM
        # systems calculate velocity and displacement using time deltas
        # between messages. Without an accurate timestamp, those
        # calculations produce garbage and the tracker becomes unstable.
        msg.header.stamp = self.get_clock().now().to_msg()

        self.publisher.publish(msg)

def main():
    rclpy.init()
    node = CARLACameraNode()

    client = carla.Client('localhost', 2000)
    world = client.get_world()
    blueprint_library = world.get_blueprint_library()

    camera_bp = blueprint_library.find('sensor.camera.rgb')
    camera_bp.set_attribute('image_size_x', '1280')
    camera_bp.set_attribute('image_size_y', '720')
    camera_bp.set_attribute('fov', '90')

    spawn_point = world.get_map().get_spawn_points()[0]
    camera = world.spawn_actor(camera_bp, spawn_point)
    camera.listen(node.camera_callback)

    rclpy.spin(node)
    camera.destroy()
    node.destroy_node()
    rclpy.shutdown()
```

The `cv_bridge` library handles the conversion between OpenCV arrays and ROS 2 image messages. The `bgr8` encoding tells downstream subscribers what colour format to expect. Without this, colour channels can be silently swapped and your detector will produce incorrect results on perfectly valid input.

---

## How to Build the Perception Node with Threaded Inference

This is the most architecturally important node in the pipeline, and the design deserves explanation before looking at the code.

ROS 2 processes subscriber callbacks on a single executor thread by default. If your YOLO inference call happens inside the callback, it blocks that thread for the duration of inference. While inference is running, the subscriber can't receive new messages.

Depending on your queue size and frame rate, this means you start processing frames that are already stale by the time inference finishes. Your tracker then sees an irregular, time-inconsistent stream rather than a smooth one.

The fix is to decouple ingestion from processing. The callback does one thing: puts the incoming frame into a bounded queue and returns immediately. A separate thread pulls from that queue and runs inference.

The queue has a maximum size. When inference can't keep up and the queue is full, new frames are dropped rather than queued indefinitely. This is an intentional design choice: in a real-time system, a stale frame processed late is usually worse than a dropped frame, because it causes the tracker to see the world as it was rather than as it is.

Create <VPIcon icon="fa-brands fa-python"/><VPIcon icon="fa-brands fa-python"/>`perception_node.py`:

```py :collapsed-lines title="perception_node.py"
import threading title="perception_node.py"
import queue

import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
from ultralytics import YOLO
import cv2

CONFIDENCE_THRESHOLD = 0.45

class PerceptionNode(Node):
    def __init__(self):
        super().__init__('perception_node')

        self.bridge = CvBridge()
        self.model = YOLO('models/yolov11n.pt')

        # Bounded queue: maxsize=5 prevents stale frame accumulation.
        # When the queue is full, image_callback drops the incoming frame
        # rather than waiting, keeping the pipeline current.
        self.frame_queue = queue.Queue(maxsize=5)

        self.subscription = self.create_subscription(
            Image,
            '/carla/camera/rgb',
            self.image_callback,
            10
        )

        self.inference_thread = threading.Thread(
            target=self.run_inference,
            daemon=True
        )
        self.inference_thread.start()
        self.get_logger().info('Perception node ready.')

    def image_callback(self, msg):
        # Drop the frame if inference is not keeping up.
        # We never want to block the callback thread.
        if not self.frame_queue.full():
            self.frame_queue.put(msg)

    def run_inference(self):
        while rclpy.ok():
            msg = self.frame_queue.get()
            frame = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')

            results = self.model(frame, conf=CONFIDENCE_THRESHOLD, verbose=False)

            detections = results[0].boxes
            self.get_logger().info(
                f'Detected {len(detections)} objects above threshold {CONFIDENCE_THRESHOLD}'
            )

def main():
    rclpy.init()
    node = PerceptionNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
```

---

## How to Integrate ByteTrack for Multi-Object Tracking

Detection alone tells you what's in a single frame. Tracking tells you what's happening across time: which car is which, where it's going, and whether it's the same vehicle you saw two seconds ago.

ByteTrack works by associating new detections with existing tracks using intersection-over-union (IoU), a measure of bounding box overlap between a predicted track position and an incoming detection.

It uses a two-stage matching process that handles both high-confidence and low-confidence detections, making it more robust during occlusion than simpler trackers.

The three parameters you'll tune most often are:

- `track_thresh`: the minimum detection confidence to initiate or confirm a track
- `match_thresh`: the minimum IoU for a detection to be matched to an existing track
- `track_buffer`: how many frames a track survives without a matching detection before it's removed

Create <VPIcon icon="fa-brands fa-python"/>`tracker.py`:

```py :collapsed-lines title="tracker.py"
from supervision import ByteTracker, Detections
import numpy as np

class RoboticsTracker:
    def __init__(self):
        # track_buffer controls how long a track survives
        # without a matching detection. Higher values help
        # during brief occlusions but can produce ghost tracks
        # for objects that have genuinely left the scene.
        self.tracker = ByteTracker(
            track_thresh=0.45,
            match_thresh=0.8,
            track_buffer=30,
            frame_rate=30
        )

    def update(self, yolo_results, frame_shape):
        boxes = yolo_results[0].boxes

        if len(boxes) == 0:
            return []

        xyxy = boxes.xyxy.cpu().numpy()
        confidence = boxes.conf.cpu().numpy()
        class_ids = boxes.cls.cpu().numpy().astype(int)

        detections = Detections(
            xyxy=xyxy,
            confidence=confidence,
            class_id=class_ids
        )

        tracked = self.tracker.update(
            detections=detections,
            frame_resolution_wh=(frame_shape[1], frame_shape[0])
        )

        # tracked.tracker_id gives each detection a stable integer ID
        # that persists across frames as long as the track is alive.
        return tracked
```

The `tracker_id` field is what makes tracking useful for navigation. Instead of a list of anonymous bounding boxes, the downstream system now knows that object ID 7 is a pedestrian that has been moving north-east for the last 12 frames.

---

## How to Add a Confidence Validation Layer

A single high-confidence detection isn't sufficient grounds for a robot to change its behaviour. Confidence scores measure how certain the model is about what it detected. They don't measure whether the detection is temporally stable, whether the platform itself is stable, or whether the surrounding context makes the detection plausible.

This validation layer requires consensus from multiple signals before flagging a detection as actionable. Create <VPIcon icon="fa-brands fa-python"/>`validator.py`:

```py title="validator.py"
CONFIDENCE_THRESHOLD = 0.45
MIN_TRACK_AGE = 3        # frames a track must exist before being trusted
JITTER_THRESHOLD = 2.0   # maximum acceptable platform acceleration (m/s²)

def is_actionable_detection(detection, track_age: int, platform_acceleration: float):
    """
    Returns True only when a detection passes all three checks:
    1. Model confidence is above threshold (filters weak detections)
    2. Track has existed long enough to be considered stable
       (filters noise that triggers a detection in one or two frames but not more)
    3. The platform carrying the sensor is not vibrating or accelerating
       sharply enough to corrupt the sensor data itself
    """
    if detection.confidence < CONFIDENCE_THRESHOLD:
        return False, "low_confidence"

    if track_age < MIN_TRACK_AGE:
        return False, "track_not_stabilised"

    if platform_acceleration > JITTER_THRESHOLD:
        return False, "platform_unstable"

    return True, "actionable"
```

This pattern separates model output from system-level trust. The model's job is to produce detections. The validator's job is to decide which of those detections are safe to act on given the current operational state of the robot.

---

## How to Export Your Model to ONNX for Edge Deployment

ONNX, which stands for Open Neural Network Exchange, is an open format that represents machine learning models in a way that's portable across frameworks and runtimes. Instead of running inference through PyTorch, you export your model once to the ONNX format and then run it through ONNX Runtime or TensorRT, both of which are significantly more efficient on edge hardware.

TensorRT is NVIDIA's inference optimisation library. It takes an ONNX model and compiles it specifically for the target GPU, applying kernel fusion, layer optimisation, and optional precision reduction to INT8 or FP16. The result is an inference engine that runs measurably faster than the original PyTorch model on the same hardware, which in a 30 FPS real-time pipeline can be the difference between a usable system and an unusable one.

Create <VPIcon icon="fa-brands fa-python"/>`export_onnx.py`:

```py :collapsed-lines title="export_onnx.py"
from ultralytics import YOLO

def export_perception_model(weights_path: str, output_path: str):
    """
    Exports a YOLOv11 model to ONNX format for edge deployment.

    The dynamic_axes setting on the batch dimension means the exported
    model can accept single frames (batch=1) or batches of frames
    without needing to be re-exported. This is useful for testing
    with batched input during benchmarking.
    """
    model = YOLO(weights_path)

    # Export using Ultralytics' built-in ONNX export.
    # opset=17 is the recommended version for compatibility
    # with TensorRT 8.x and later.
    model.export(
        format='onnx',
        imgsz=640,
        opset=17,
        dynamic=True,     # enables dynamic batch size
        simplify=True     # runs onnx-simplifier to clean the graph
    )

    print(f"Model exported to {output_path}")

if __name__ == '__main__':
    export_perception_model(
        weights_path='models/yolov11n.pt',
        output_path='models/perception.onnx'
    )
```

To run inference using the exported ONNX model instead of PyTorch, replace the YOLO inference call in <VPIcon icon="fa-brands fa-python"/>`perception_node.py` with an ONNX Runtime session:

```py title="perception_node.py"
import onnxruntime as ort
import numpy as np
import cv2

session = ort.InferenceSession(
    'models/perception.onnx',
    providers=['CUDAExecutionProvider', 'CPUExecutionProvider']
)

def run_onnx_inference(frame: np.ndarray):
    # Preprocess: resize, normalise, add batch dimension, convert to float32
    img = cv2.resize(frame, (640, 640))
    img = img.astype(np.float32) / 255.0
    img = img.transpose(2, 0, 1)          # HWC to CHW
    img = np.expand_dims(img, axis=0)     # add batch dimension

    outputs = session.run(None, {'images': img})
    return outputs
```

The `providers` list tells ONNX Runtime to prefer CUDA for GPU acceleration and fall back to CPU if CUDA is unavailable. This makes the same inference code portable across development machines and edge devices without code changes.

---

## How to Test the Full Pipeline

With all nodes written, launch the pipeline in two terminals.

In the first terminal, start the camera publisher:

```sh
cd ~/ros2_perception_ws
source install/setup.bash
ros2 run perception_stack camera_publisher
```

In the second terminal, start the perception node:

```sh
source install/setup.bash
ros2 run perception_stack perception_node
```

To verify that frames are flowing correctly between nodes, you can inspect the topic in a third terminal:

```sh
ros2 topic hz /carla/camera/rgb
```

This command prints the message rate on the camera topic. At 30 FPS you should see approximately 30 messages per second. A significantly lower number suggests the CARLA callback is dropping frames or the network between nodes is saturated.

To visually inspect what the perception node is detecting, you can add a simple visualisation by publishing an annotated image topic from within `run_inference`:

```py
annotated = results[0].plot()  # draws boxes and labels on the frame
annotated_msg = self.bridge.cv2_to_imgmsg(annotated, encoding='bgr8')
annotated_msg.header.stamp = self.get_clock().now().to_msg()
self.annotated_publisher.publish(annotated_msg)
```

Then open the annotated stream in `rqt_image_view`:

```sh
ros2 run rqt_image_view rqt_image_view /perception/annotated
```

---

## Conclusion

You have now built a real-time robotic perception pipeline from the sensor all the way through to validated, trackable detections. The system you've built handles camera ingestion, threaded inference, multi-object tracking, confidence-based validation, and edge-optimised model export.

The deeper lesson across all of these components is the same one: robotics perception is a systems problem, not a model problem. A well-trained model is necessary but not sufficient. What matters in production is whether the pipeline handles timing correctly and degrades gracefully under load, whether failure states are defined, and whether the architecture separates concerns clearly enough to debug and iterate on in the field.

The next steps from here are to replace the detection logging in <VPIcon icon="fa-brands fa-python"/>`perception_node.py` with a proper ROS 2 message publisher for detections, integrate the output into a Nav2 navigation stack, and run the full pipeline on your target hardware to validate that the ONNX optimisations hold up under real deployment conditions.
 title="perception_node.py"
If you're building something similar or have questions about any part of this, feel free to reach out. There's always more to talk about when it comes to robots that actually have to work.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Real-Time Object Detection and Tracking Pipeline with ROS 2 and YOLOv11",
  "desc": "If you've ever tried to build a robotics system that can actually see, track, and respond to the world around it, you know that the hard part isn't training a detection model. The hard part is making ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-real-time-object-detection-and-tracking-pipeline-with-ros-2-and-yolov11.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

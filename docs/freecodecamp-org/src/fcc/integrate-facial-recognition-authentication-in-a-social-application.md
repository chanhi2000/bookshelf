---
lang: en-US
title: "How to Integrate Facial Recognition Authentication in a Social App with Face API"
description: "Article(s) > How to Integrate Facial Recognition Authentication in a Social App with Face API"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Integrate Facial Recognition Authentication in a Social App with Face API"
    - property: og:description
      content: "How to Integrate Facial Recognition Authentication in a Social App with Face API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/integrate-facial-recognition-authentication-in-a-social-application.html
prev: /programming/js-react/articles/README.md
date: 2025-09-23
isOriginal: false
author:
  - name: Oluwatobi
    url : https://freecodecamp.org/news/author/Tobilyn77/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758208687476/3ca6b95d-55c8-4bb6-a4aa-580409e1608f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Integrate Facial Recognition Authentication in a Social App with Face API"
  desc="Social applications have evolved over the years, and there is a major need for secure methods to authenticate users' identities. Integrating multifactor authentication capabilities into applications is crucial for strengthening their integrity. In so..."
  url="https://freecodecamp.org/news/integrate-facial-recognition-authentication-in-a-social-application"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758208687476/3ca6b95d-55c8-4bb6-a4aa-580409e1608f.png"/>

Social applications have evolved over the years, and there is a major need for secure methods to authenticate users' identities.

Integrating multifactor authentication capabilities into applications is crucial for strengthening their integrity. In social apps, authentication mechanisms eliminate unwanted access to personal information between two parties. Facial authentication is not entirely new, as most devices have it built-in as security measure. It offers stronger protection compared to many traditional methods, especially against risks like phishing, brute-force attacks, and account hacking.

---

## What to Expect

In this article, I’ll walk you through creating a multi-factor authentication system for a chat application powered by [<VPIcon icon="fas fa-globe"/>Stream.io](https://getstream.io), and ensuring efficient user face ID authentication to allow only authorized access to your app. I will illustrate all these with relevant code examples.

::: note Prerequisites

Here are the necessary prerequisites to follow along with this tutorial:

- Intermediate knowledge of Node.js/Express for the backend aspect
- Knowledge of React for the frontend aspect
- [<VPIcon icon="fas fa-globe"/>Stream.io](https://getstream.io) API key

:::

Before we get started, we’ll briefly highlight the facial authentication tool of choice: [<VPIcon icon="fas fa-globe"/>Face-Api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html).

---

## A Brief Intro to the Face API tool

Face-Api.js is a facial recognition package designed for integration with JavaScript-powered applications. It was built on top of the Tensor flow library and provides extensive facial detection based on machine learning models and abstract calculations.

In addition to all these features, it's friendly to use and can also be used locally with its predefined models. Here is a link to its [<VPIcon icon="fas fa-globe"/>documentation page](https://justadudewhohacks.github.io/face-api.js/docs/index.html), which provides relevant code examples.

It provides features such as face detection, face capture, and face match, which use the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm) to make precise distinctions. We'll now set it up alongside our chat application project in the next section.

---

## Project Setup

As mentioned earlier, this is a full-stack project containing both the frontend and the backend aspects. In this section, we’ll set up both code bases before proceeding to the demo project section.

### Frontend

We will power the application using the Vite framework for the frontend.

```sh
npm create vite@latest
```

After creating the React application, install `face-api.js` with this command:

```sh
npm i face-api.js
```

This will install the `face` package and the required dependencies. You can then install Stream’s powered chat SDK, which will form the main crux of the project.

```sh
npm i stream-chat stream-chat-react
```

After successful completion, we are finally done with the project structure scaffold. To aid ease of local testing of our frontend application, we will have to host the face models needed by the Face package locally. Here is a [link (<VPIcon icon="iconfont icon-github"/>`justadudewhohacks/face-api.js-models`)](https://github.com/justadudewhohacks/face-api.js-models) to the models. Kindly copy the model's folder and paste it into the public folder in the code project. Next, we’ll set up our backend project.

### Backend

The backend is built to store user details and ensure user authentication before accessing the chat application. MongoDB will be the database of choice, and we will use the Express.js library as the backend API development environment of choice. For the ease of setup, kindly clone this [code-base (<VPIcon icon="iconfont icon-github"/>`oluwatobi2001/stream-backend`)](https://github.com/oluwatobi2001/stream-backend) and install it on the local PC. It comes preloaded with the necessary installation files. To further enjoy a seamless backend experience, you can utilize the MongoDB [<VPIcon icon="iconfont icon-mongodb"/>Atlas](https://mongodb.com/products/platform/atlas-database) option as the database for storing user details. With that, we will now begin the code project in the next section.

---

## Demo Project: Integrating Facial Recognition and Authentication

In this section, we will walk through setting up an authentication page on the frontend where a user can register their details, username, email, and password on the registration page. They are also obliged to take a snapshot of their face, and the face API will be called to detect a face in the image. They won't be allowed to proceed beyond this until it is successful.

Thereafter, the image `faceDescriptor` function is called, which generates a unique face description vector value of the user’s face based on the machine learning models provided. These values are securely stored in the MongoDB database via the Express.js backend after successfully registering. The application is coupled to a multifactor authentication system, which has both the password based authentication and the facial authentication mechanisms.

When the first hurdle (password authentication) is completed, the user is then required to take a face match, comparing it with the user's face descriptor stored from the registration page. The comparison is achieved using the Euclidean algorithmic comparison based on the threshold we provide. If it meets the threshold, the face is said to be matched, and the user gets access to the chat application; else, the user is denied access to the Stream.io-powered chat application. Relevant source code snippets highlighting these steps will be provided concurrently with images.

We’ll begin by building a defunct registration page for our chat application using React, of course. We will begin by importing and initializing the necessary packages.

```js
import React, {useState, useRef, useEffect} from 'react';
import * as faceapi from "face-api.js"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  // ...
  const navigate= useNavigate("/")
  const userRef = useRef();
  const passwordRef= useRef();
  const emailRef = useRef();
  const FullRef = useRef()
  // ...
}
```

In the code snippet above, we imported useful React hooks and initialized our installed `Face-api.js` tool. [<VPIcon icon="fa-brands fa-npm"/>`axios`](https://npmjs.com/package/axios) will serve as our API request tool of choice for this project. The `useRef` hook will be used to track the user inputs. We then defined the register function and initialized the various `useRef` hooks for the various input fields to be inputted.

```jsx
const Register = () => {
  // ...
  useEffect(()=> {
    const loadModels = async() => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      setModelIsLoaded(true);
      startVideo();
    }
    loadModels()
  }, [])
  // ...
}
```

In the code above, the `useEffect` hook is called to ensure that the various locally stored `face-api` models are initialized and active in our application. The models are stored in the `models` sub-folder within the `public` folder. Going forward, after initializing our models, we will now set up our camcorder feature on our webpage.

```jsx
const Register = () => {
  // ...
  const [faceDetected, setFaceDetected] = useState(false);
    // Start video feed
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };
    const captureSnapshot = async () => {
      const canvas = snapshotRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSnapshot(dataUrl);

      // Generate the face descriptor (128-dimensional vector)
      const detection = await faceapi
          .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

      if (detection) {
        const newDescriptor = detection.descriptor;
        setDescriptionValue(newDescriptor)
        console.log( newDescriptor);
        setSubmitDisabled(false)
        stopVid()
      } else {
        console.error("No face detected in snapshot");
      }
    };
    const stopVid =() => {
        navigator.mediaDevices
            .getUserMedia({ video: false })
        const stream = videoRef?.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => {track.stop()})
            videoRef.current.srcObject = null;
            setCameraActive(false)
        }
    }
        // Detect face in the video stream
        const handleVideoPlay = async () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                if (!cameraActive) return ;
                const detections = await faceapi.detectAllFaces(
                    video,
                    new faceapi.TinyFaceDetectorOptions()
                );

                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                    const detected = detections.length > 0;
                 if (detected && !faceDetected) {
                captureSnapshot();  // Capture the snapshot as soon as a face is detected
            }

                setFaceDetected(detections.length > 0);
            }, 100);
        };
```

In the code above, we begin by defining a `useState` array when the user’s face is detected during the sign-up process. Thereafter, the function to trigger the browser camcorder is then activated. With this on, we can then trigger the `handlePlayFunction` in the code. This function monitors facial detection as highlighted by the face models already initialized. The `stopVid` function is also triggered when the user’s facial detection has been successfully completed.

In this section, we also activated the browser camcorder tool in our application to provide us with real time video. The `CaptureSnapshot` function helps to obtain a snapshot from the current video being showcased.

```js
const RegSubmit = async (e) => {
  e.preventDefault();
  console.log("hello");

  try {
    const res = await axios.post(BACKEND_URL, {
      username: userRef.current.value,
      email: emailRef.current.value,
      FullName: FullRef.current.value,
      password: passwordRef.current.value,
      faceDescriptor: descriptionValue,
    });

    console.log(res.data);
    setError(false);
    navigate("/login");
    console.log("help");
  } catch (err) {
    console.error(err);
    setError(true);
  }
};
```

With all the values obtained, the `regSubmit` function is then defined. When executed, it stores the provided user details with the face description object on our backend server which can then be accessed in the next section for authentication.

Below is the full registration code.

```js
import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate("/");

  const userRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const FullRef = useRef();
  const snapshotRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [modelIsLoaded, setModelIsLoaded] = useState(false);
  const [detections, setDetections] = useState([]);
  const [error, setError] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [descriptionValue, setDescriptionValue] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      setModelIsLoaded(true);
      startVideo();
    };

    loadModels();
  }, []);

  const RegSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");

    try {
      const res = await axios.post('http://localhost:5000/v1/users', {
        username: userRef.current.value,
        email: emailRef.current.value,
        FullName: FullRef.current.value,
        password: passwordRef.current.value,
        faceDescriptor: descriptionValue
      });

      console.log(res.data);
      setError(false);
      navigate("/login");
      console.log("help");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  const stopVid = () => {
    navigator.mediaDevices.getUserMedia({ video: false });
    const stream = videoRef?.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureSnapshot = async () => {
    const canvas = snapshotRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setSnapshot(dataUrl);

    const detection = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      const newDescriptor = detection.descriptor;
      setDescriptionValue(newDescriptor);
      console.log(newDescriptor);
      setSubmitDisabled(false);
      stopVid();

      if (storedDescriptor && isMatchingFace(storedDescriptor, newDescriptor)) {
        setInterval(alert("face matched"), 100);
      } else {
        alert("No Match Found!");
      }
    } else {
      console.error("No face detected in snapshot");
    }
  };

  const handleVideoPlay = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (!cameraActive) return;

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);

      const detected = detections.length > 0;
      if (detected && !faceDetected) {
        captureSnapshot();
      }

      setFaceDetected(detected);
    }, 100);
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center">
      <div className="flex flex-col">
        <form className="flex flex-col mb-2 w-full" onSubmit={RegSubmit}>
          <h3 className="flex flex-col mx-auto mb-5">Registration Page</h3>

          <div className="flex flex-col mb-2 w-[50%] mx-auto items-center">
            <input
              type="text"
              placeholder="Email"
              className="w-full rounded-2xl h-[50px] border-2 p-2 mb-2 border-gray-900"
              required
              ref={emailRef}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-2xl h-[50px] border-2 p-2 mb-2 border-gray-900"
              required
              ref={userRef}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl h-[50px] border-2 p-2 mb-2 border-gray-900"
              required
              ref={FullRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl h-[50px] border-2 p-2 mb-2 border-gray-900"
              required
              ref={passwordRef}
            />

            <div>
              {!modelIsLoaded && cameraActive && !descriptionValue ? (
                <p>Loading</p>
              ) : (
                <>
                  {!descriptionValue && (
                    <>
                      <video
                        ref={videoRef}
                        width="200"
                        height="160"
                        onPlay={handleVideoPlay}
                        autoPlay
                        muted
                      />
                      <canvas
                        ref={canvasRef}
                        width="200"
                        height="160"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                      />
                      <p>
                        {faceDetected ? (
                          <span style={{ color: 'green' }}>Face Detected</span>
                        ) : (
                          <span style={{ color: 'red' }}>No Face Detected</span>
                        )}
                      </p>
                      <canvas
                        ref={snapshotRef}
                        width="480"
                        height="360"
                        style={{ display: 'none' }}
                      />
                    </>
                  )}
                </>
              )}

              {snapshot && (
                <div style={{ marginTop: '20px' }}>
                  <h4>Face Snapshot:</h4>
                  <img
                    src={snapshot}
                    alt="Face Snapshot"
                    width="200"
                    height="160"
                  />
                </div>
              )}
            </div>

            <div className="mt-2">
              <button type="button" onClick={stopVid}>
                Stop Video
              </button>
            </div>

            <button
              disabled={submitDisabled}
              className="mx-auto mt-4 rounded-2xl cursor-pointer text-white bg-primary w-[80%] lg:w-[50%] h-[40px] text-center items-center justify-center"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="flex flex-col mt-1 w-full">
            <p className="flex justify-center">
              Registered previously?&nbsp;
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>
            </p>
          </div>

          {error && (
            <p className="text-red-600 text-center mt-2">
              Error while registering, try again
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
```

Going forward, we will be working on our multifactor authentication system. In the code below, we will be highlighting the `loginSubmit` function which will be triggered when the user email and password credentials are provided for logging in to our chat application. The `useRef` hook is initialized which ensures that the values passed in the input boxes are parsed to the backend via the `Axios` request tool.

```js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);

  const LoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/v1/auth/login',
        {
          email: userRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true }
      );

      console.log(res?.data);
      setError(false);
      navigate('/confirm-auth');
      console.log(res);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
}
```

The full login page code example will be provided [here](http://github.com/oluwatobi2001/Stream-frontend.git). After successfully confirming their identity via the use of the password authentication feature, we can then go on to confirm the user’s identity via the use of the face recognition system.

```js
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
```

First of all, we will set up the app by importing the necessary dependencies as highlighted in the code snippet above.

```js

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    loadModels();
  }, []);

  const handleVideoPlay = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (!cameraActive) return;

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);

      const detected = detections.length > 0;
      if (detected && !faceDetected) {
        captureSnapshot();
      }

      setFaceDetected(detected);
    }, 100);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  const stopVid = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const deleteImage = () => {
    setSnapshot(null);
    setDescriptionValue(null);
    setFaceDetected(false);
    setCameraActive(true);
    startVideo();
  };

  const captureSnapshot = async () => {
    const canvas = snapshotRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    setSnapshot(dataUrl);
    stopVid();

    const detection = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      const newDescriptor = detection.descriptor;
      setDescriptionValue(newDescriptor);
      console.log(newDescriptor);
    }
  };
```

After initializing all the necessary dependencies, we also imported our models as we did in the registration page to detect the user’s face and then generate a face description. We also allowed for the user to delete the snapshot and retake the image as many times as possible.

```js
  const FaceAuthenticate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/v1/auth/face-auth',
        { faceDescriptor: descriptionValue },
        { withCredentials: true }
      );

      console.log(res?.data);
      navigate('/chat');
    } catch (err) {
      console.log(err);
    }
  };
```

After the face descriptor object gets generated, we then sent it to the backend to compare it with the stored face descriptor obtained at the point of registration. If they match, we get redirected to the chat application. Otherwise, an appropriate error message denying us access to the chat application is displayed.

Here is the code to the `FaceAuth` page:

```js
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';

const FaceAuth = () => {
  const navigate = useNavigate("/");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const snapshotRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(true);
  const [snapshot, setSnapshot] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    loadModels();
  }, []);

  const handleVideoPlay = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (!cameraActive) return;

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);

      const detected = detections.length > 0;
      if (detected && !faceDetected) {
        captureSnapshot();
      }

      setFaceDetected(detected);
    }, 100);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  const stopVid = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const deleteImage = () => {
    setSnapshot(null);
    setDescriptionValue(null);
    setFaceDetected(false);
    setCameraActive(true);
    startVideo();
  };

  const captureSnapshot = async () => {
    const canvas = snapshotRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    setSnapshot(dataUrl);
    stopVid();

    const detection = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      const newDescriptor = detection.descriptor;
      setDescriptionValue(newDescriptor);
      console.log(newDescriptor);
    }
  };

  const FaceAuthenticate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/v1/auth/face-auth',
        { faceDescriptor: descriptionValue },
        { withCredentials: true }
      );

      console.log(res?.data);
      navigate('/chat');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex w-full h-screen flex-col justify-center">
        <p className="flex flex-col mx-auto items-center text-lg font-semibold mb-3">
          Take a snapshot to confirm your identity
        </p>
        <p className="text-center mb-4">Ensure that the picture is taken in a bright area</p>

        <button
          onClick={startVideo}
          className="flex w-[30%] mx-auto text-center items-center justify-center mb-5 h-[40px] bg-blue-600 rounded-md text-white"
        >
          Turn on Webcam
        </button>

        {!snapshot ? (
          <>
            <video
              className="flex mx-auto items-center rounded-md"
              ref={videoRef}
              width="240"
              height="180"
              onPlay={handleVideoPlay}
              autoPlay
              muted
            />
            <canvas
              ref={snapshotRef}
              width="240"
              height="180"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <button onClick={captureSnapshot} className="mt-4 mx-auto block text-sm text-blue-600 underline">
              Take a snapshot
            </button>
          </>
        ) : (
          <div className="flex w-full justify-center">
            <img
              src={snapshot}
              className="rounded-lg"
              width="240"
              height="180"
              alt="Face Snapshot"
            />
          </div>
        )}

        <div className="flex flex-row w-full justify-evenly mt-5">
          <button
            onClick={deleteImage}
            className="bg-purple-500 text-white p-2 h-[35px] rounded-lg"
          >
            Delete Image
          </button>
          <button
            onClick={FaceAuthenticate}
            className="bg-purple-500 text-white p-2 h-[35px] rounded-lg"
          >
            Upload Image
          </button>
        </div>
      </div>
    </>
  );
};

export default FaceAuth;
```

Displayed below is how the face authentication page should look like.

![facial authentication page ](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcPFsPVo9dymrTmMCyskCszbMf_SdG2n_j5gd7ayT1nQ6jOlhX8a_KFRG51cnqMCxUqFaVgTR2hrdGipmudd9B2TQpNfm4FrFMlYRo7bbu1gtRq1bKB5FmPi4QcbEPTLyDtAPbNEA?key=bLpVfispbJQQ4phtxWLC7w)

Having set up the frontend, let's head to the backend and configure the registration and login endpoint for our project. The entire code to the backend project can be gotten [here](http://github.com/oluwatobi2001/stream-backend.git). We will only be highlighting the `faceAuth` backend function in this article.

To verify authentication, we will be using the sessions option instead of the JWT option. Important user information will be stored and accessed in the session cookies attached to the requests and responses to the frontend. Here is the `faceAuth` function:

```js
const faceAuth = async (req, res) => {
  try {
    console.log(req.session);

    const id = req.session.passport?.user;
    console.log(id);


    const user = await User.findById(id);
    console.log(user);

    if (user == null) {
      return res.status(400).json({ err: "User not found" });
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};
```

First, we defined an asynchronous function named `faceAuth`. We then obtained the unique ID of the user who had successfully scaled over the initial login process from the request session.

To confirm the similarity of the user's stored face descriptor and the picture sent from the frontend, we utilized the matching face function based on the Euclidean algorithm to confirm the user's identity as done below.

```js
const isMatchingFace = (descriptor1, descriptor2, threshold = 0.6) => {
  // Convert the stored descriptors to Float32Array if they aren't already
  if (!(descriptor1 instanceof Float32Array)) {
    descriptor1 = new Float32Array(Object.values(descriptor1));
  }

  if (!(descriptor2 instanceof Float32Array)) {
    descriptor2 = new Float32Array(Object.values(descriptor2));
  }

  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  console.log("Euclidean Distance:", distance);

  return distance < threshold;
};
```

As stated in the code above, the threshold of similarity of comparison used was 0.6. This is flexible and can be modified to suit the user's preference, as a higher threshold will provide better accuracy overall.  
If the function returns true, then the user has been successfully authenticated and can then have access to our chat application. Here is the full code snippet.

```js
const faceAuth = async (req, res) => {
  try {
    console.log(req.session);

    const id = req.session.passport?.user;
    console.log(id);

    const { faceDescriptor } = req.body;
    const user = await User.findById(id);
    console.log(user);

    if (user == null) {
      return res.status(400).json({ err: "User not found" });
    }

    const isMatchingFace = (descriptor1, descriptor2, threshold = 0.6) => {
      // Convert the stored descriptor (object) to a Float32Array
      if (!(descriptor1 instanceof Float32Array)) {
        descriptor1 = new Float32Array(Object.values(descriptor1));
      }

      if (!(descriptor2 instanceof Float32Array)) {
        descriptor2 = new Float32Array(Object.values(descriptor2));
      }

      const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
      console.log("Euclidean Distance:", distance);

      return distance < threshold;
    };

    if (isMatchingFace(faceDescriptor, user.faceDescriptor)) {
      console.log("Face match successful");
      req.session.mfa = true;

      return res.status(200).json({
        msg: "User authentication was successful. Proceed to the chat app.",
      });
    } else {
      return res.status(401).json({ msg: "Face does not match. Access denied." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "User face couldn't be authenticated. Please try again later",
    });
  }
};
```

With the main hurdle completed, we can then navigate to our application and have a seamless chat experience.

Additionally, as a safety measure, a rate limiter is also in place to minimize the use of brute-force techniques by malicious individuals to gain access to the chat application.

---

## Additional Information and Tips

The overall aim of these efforts is to achieve a more scalable and secure method of user validation. The threshold can easily be modified and tweaked to improve application accuracy. Alternatively, the [AWS Rekognition](https://aws.amazon.com/rekognition/) tool can sufficiently replace the Face API tool with efficient cloud-powered models. The limitations of facial recognition can also be overcome by exploring biometric authentication, as it’s a known fact that each individual's fingerprint is unique, greatly reducing the risk of user compromise.

---

## Conclusion

So far, we have walked through the process of creating an efficient multi-factor facial authentication-based tool to prevent intruder access to our chat application, ensuring and prioritizing the highest level of user privacy. Need an SDK that assures you of a seamless and secure chat experience? Try Stream.io today.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Integrate Facial Recognition Authentication in a Social App with Face API",
  "desc": "Social applications have evolved over the years, and there is a major need for secure methods to authenticate users' identities. Integrating multifactor authentication capabilities into applications is crucial for strengthening their integrity. In so...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/integrate-facial-recognition-authentication-in-a-social-application.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

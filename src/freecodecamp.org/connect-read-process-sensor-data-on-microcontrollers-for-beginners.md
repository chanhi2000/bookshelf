---
lang: en-US
title: "How to Connect, Read, and Process Sensor Data on Microcontrollers – A Beginner's Guide"
description: "Article(s) > How to Connect, Read, and Process Sensor Data on Microcontrollers – A Beginner's Guide"
icon: iconfont icon-stm32
category:
  - Hardware
  - STM32
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - hardware
  - stm32
  - computer
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Connect, Read, and Process Sensor Data on Microcontrollers – A Beginner's Guide"
    - property: og:description
      content: "How to Connect, Read, and Process Sensor Data on Microcontrollers – A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/connect-read-process-sensor-data-on-microcontrollers-for-beginners.html
prev: /hw/stm32/articles/README.md
date: 2025-03-15
isOriginal: false
author:
  - name: Soham Banerjee
    url : https://freecodecamp.org/news/author/sohamstars/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741902732575/fd41a2d5-ed4f-445d-b186-936625837c8d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "STM32 > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/stm32/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Connect, Read, and Process Sensor Data on Microcontrollers – A Beginner's Guide"
  desc="In today’s world, computers are ubiquitous and generally serve two primary purposes. The first is general-purpose computing, where they handle a wide range of tasks, including running diverse applications and programs. Examples include laptops, deskt..."
  url="https://freecodecamp.org/news/connect-read-process-sensor-data-on-microcontrollers-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741902732575/fd41a2d5-ed4f-445d-b186-936625837c8d.png"/>

In today’s world, computers are ubiquitous and generally serve two primary purposes.

The first is general-purpose computing, where they handle a wide range of tasks, including running diverse applications and programs. Examples include laptops, desktops, servers, and supercomputers.

The second is embedded systems, which are specialized computers designed for specific functions. Commonly found in devices such as thermostats, refrigerators, cars, and other smart appliances, they rely on sensors to collect environmental data and execute their tasks efficiently.

::: info The Role of Sensors

Sensors play a critical role in both types of computing. In embedded systems, sensors gather environmental data to help devices like autonomous vehicles, home appliances, and industrial machines perform tasks. In general-purpose computers, sensors primarily monitor internal conditions such as temperature and voltage, ensuring safe operation and preventing issues like overheating or electrical faults.

As Artificial Intelligence (AI) and the Internet of Things (IoT) evolve, sensors have become indispensable for gathering real-world data to support intelligent decision-making. Embedded systems leverage sensors to perceive their environment, transforming raw data into actionable insights that power automation and improve efficiency across industries.

This means that understanding sensor interfacing and designing robust sensor-driven software has become a vital skill for engineers and hobbyists alike.

:::

Whether you're a beginner or experienced engineer, this guide will help you build a solid understanding of sensor interfacing software.

---

## What You’ll Learn and Article Scope

In this article, you’ll learn how to connect sensors to microcontrollers (MCUs) and design sensor software pipelines that turn raw data into meaningful, usable information. You’ll also explore practical techniques for processing sensor data accurately and efficiently in embedded systems.

Here’s a breakdown of what we’ll cover:

- What sensors are and how they work – An introduction to sensors, common types, and how sensor pipelines help process sensor data.
- Key sensor characteristics – Important parameters like sensitivity, accuracy, precision, range, drift, and response time to help you choose the right sensor for your project.
- How to interface sensors with microcontrollers – Hardware connections and communication protocols like SPI, I²C, and GPIO that allow microcontrollers to read sensor data.
- Software architecture for sensor data – A high-level overview of the software pipeline that processes sensor data, including drivers, ADC support, scaling, calibration, and post-processing.
- Detailed design of pipeline components – A closer look at each step in the pipeline, focusing on scaling raw data, calibrating sensors, and applying filters to clean up noisy signals.
- Practical tips for power management – Best practices for handling power efficiently using low-power modes, FIFO buffers, and DMA when working with sensor data in embedded systems.

By the end of this article, you’ll know how to design and implement a complete sensor data pipeline for an embedded system, from reading raw sensor data to preparing it for real-world use in intelligent, connected devices.

::: note Prerequisites

Advanced data processing, high-resolution ADCs, and hardware circuit design for sensors are outside the scope of this article.

To get the most out of this article, you should have:

1. Basic knowledge of microcontrollers: Understanding of common peripherals like ADCs (Analog-to-Digital Converters), SPI (Serial Peripheral Interface), I2C (Inter-Integrated Circuit) and GPIO (General Purpose Input/Output). If you’re new to these protocols, [<FontIcon icon="fas fa-globe"/>this article provides a great overview](https://parlezvoustech.com/en/comparaison-protocoles-communication-i2c-spi-uart/).
2. Basic knowledge of electronics: Familiarity with circuits and signals, including analog and digital interfaces.
3. Programming in C: Familiarity in embedded software development, including driver development.
4. (Optional) Basic knowledge of sensors: Understanding different types of sensors (like temperature, pressure, motion) is helpful but not required.

:::

Also, this article assumes the following:

- You are working with a microcontroller equipped with the peripherals needed for sensor integration. The details of microcontroller peripherals can be found in a [<FontIcon icon="fas fa-globe"/>reference manual for example for an STM32F4](https://pdf.xab3.ro/manual/reference-manual-for-stm32f405415-stm32f407417-stm32f427437-and-stm32f429439-mcus-100) series microcontroller will have all the details :
- You are familiar with compilers, debuggers, and IDEs used in embedded systems. Some common tools include:
  - Compilers: [<FontIcon icon="fas fa-globe"/>GCC](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads), [<FontIcon icon="fas fa-globe"/>Clang](https://developer.arm.com/documentation/dui0773/l/Introducing-the-Toolchain/Toolchain-overview?lang=en),
  - Debuggers: [<FontIcon icon="fas fa-globe"/>GDB](https://sourceware.org/gdb/), [<FontIcon icon="fas fa-globe"/>LLDB](https://lldb.llvm.org/use/tutorial.html)
  - IDEs: [<FontIcon icon="iconfont icon-vscode"/>Visual Studio Code](https://code.visualstudio.com) (VSCode) is a popular choice, especially with extensions for embedded development and debugging.
  - You aim to build reliable, sensor-driven embedded systems, capable of collecting and processing real-world data efficiently.

---

## What is a Sensor and Sensor Pipeline?

A sensor detects changes in physical properties such as temperature, pressure, or light and converts them into electrical signals that can be measured or interpreted. For example, a thermistor is a type of resistor whose resistance changes with temperature. As the temperature varies, the resistance of the thermistor changes, altering the voltage across it. The system then interprets this voltage change to determine the temperature.

To better understand sensors, consider the natural sensors in the human body: the eyes, ears, skin, nose, and tongue. These natural sensors constantly send signals about the environment to the brain for processing. Different regions of the brain interpret these signals and use the information to drive actions and responses. Just like the brain processes signals from natural sensors, a microcontroller processes signals from electronic sensors using a sensor pipeline.

Sensors come in many types, each designed to detect specific physical properties. Some sensors have a sensing element that changes its properties in response to conditions like heat, light, or pressure. Examples include thermistors, infrared receivers, and photodiodes.

For detecting movement, such as acceleration and rotation, MEMS (Microelectromechanical Systems) sensors—like accelerometers and gyroscopes—are widely used.

To measure distance, sensors like sonars, ultrasonic sensors, and radars are common. These are just a few examples of the many types of sensors available.

Beyond the types of physical properties they detect, sensors also differ in their levels of integration. Some sensors are raw sensors, consisting only of a sensing element and a transducer with simple leads for direct connection to an external circuit.

Others, known as smart sensors, include additional components such as an ADC (analog-to-digital converter) and onboard processing capabilities, enabling them to handle more of the data processing independently.

The choice between a raw sensor and a smart sensor depends on your application requirements, including factors like cost, size, and the processing load on the interfacing microcontroller.

Returning to our human analogy, consider how vision works as a sensor pipeline. When light enters our eyes, photoreceptor cells (rods and cones) in the retina act as sensing elements, converting the light into electrical signals. These signals travel via the optic nerve to the brain’s visual cortex, where they undergo processing to form a recognizable image. The brain then interprets this information and initiates a response, like smiling when you see a beautiful scenery.

Similarly, a sensor pipeline for an embedded system can be defined as shown in the picture below:

![Figure 1: A Sensor Pipeline showing analogue to digital conversion, calibration, filtering, and then processing.](https://cdn.hashnode.com/res/hashnode/image/upload/v1738828676916/75137176-c9ba-432d-bf44-bb3da093e18d.png)

Each of these steps may have different requirements based on the application. Creating a requirements document for the sensor is helpful when selecting the appropriate sensor and configuring the pipeline.

---

## Sensor Characteristics

Before you dive into the blocks of the sensor pipeline, let’s review some important characteristics of a sensor.

### Sensitivity

Sensitivity is the ability of a sensor to detect small changes in the physical property it’s designed to measure.

Sensitivity can vary based on factors like manufacturing processes, cost, and the design of the sensing element.

Sensors designed for a specific property often come in different sensitivity levels, allowing users to select an appropriate sensitivity based on the application requirements.

### Accuracy

Accuracy is the degree to which a sensor’s measurement matches the true value of the physical property it’s measuring. Testing a sensor’s accuracy typically requires comparing its readings to those of a reference instrument.

A sensor may have gain and offset errors—issues that calibration can help correct. Calibration adjusts for these systematic errors, which are often due to manufacturing tolerances or design factors.

Once calibrated, the sensor’s output can be verified against a reference to confirm its accuracy. The required level of accuracy should be determined based on the application’s needs.

### Precision

Precision refers to the consistency or repeatability of a sensor's measurements, regardless of how close those measurements are to the true value. It indicates the sensor's ability to produce the same output under identical conditions and how finely it can resolve and report values.

For example, if the true temperature of an object is 12.53°C:

- A precise sensor will consistently measure values like 12.52°C, 12.53°C, or 12.54°C, even if those values are slightly offset from the true temperature.
- A highly accurate sensor, on the other hand, will measure values close to 12.53°C but may lack precision if those readings vary widely (e.g., 12.50°C, 12.53°C, and 12.56°C).
    

For applications requiring exact measurements, a sensor with both high accuracy (closeness to the true value) and high precision (low variability) is essential. This is especially important in distinguishing small differences, such as between 12.5°C and 12.53°C.

In contrast, applications with less stringent requirements might use sensors with broader tolerances, such as ±1°C, which are sufficient for general monitoring purposes.

### Range

The range of a sensor refers to the span between the maximum and minimum values of the physical property it can measure while maintaining its specified precision and accuracy. A sensor's operating range may extend beyond its measurement range, but the measurement range defines the limits within which the sensor reliably adheres to its specified sensitivity, accuracy, and response time.

### Drift

Drift is when a sensor's output changes over time due to conditions like temperature or humidity. Components within the sensor, including the sensing element, may be sensitive to these conditions, leading to gradual shifts in measurements.

For example, many components are affected by temperature and humidity changes, which can alter sensor readings. Also, sensors with internal oscillators may experience time-based drift, impacting accuracy.

Regular calibration with an accurate external reference (such as a precise clock) can help correct for drift and maintain reliable measurements. For certain applications, selecting a sensor with acceptable drift characteristics is crucial.

### Response Time

Response time is the duration a sensor takes to detect and reflect a change in the measured physical property. For example, if the temperature rises by 5°C, the response time indicates how long the temperature sensor takes to reflect this change in its output.

Response time depends on the sensor’s design, manufacturing quality, and internal components, such as the ADC (Analog-to-Digital Converter), averaging circuits, and filters within the sensor pipeline.

All the parameters mentioned above are thoroughly documented in the sensor’s data-sheet. In practice, it’s a good idea to create a sensor requirements document for each specific application, detailing these key parameters as a baseline for sensor selection.

Now that you’ve examined the key characteristics of sensors, let’s explore how you can connect them to a microcontroller for real-world applications.

---

## How to Interface with a Microcontroller

### Choosing a Communication Protocol

Another essential aspect of sensor requirements is specifying the communication interface between the sensor and the MCU or processor in the system. It’s important to understand how the sensor will be interfaced based on its output signal type and the available pins on the microcontroller.

For instance, certain sensors may connect directly to an analog or digital input pin on a microcontroller. A raw sensor, such as a temperature sensor, typically connects to an analog input pin, which is then read by the microcontroller’s internal ADC (Analog-to-Digital Converter).

In contrast, a digital-output sensor connects to a digital GPIO (General Purpose Input/Output) pin. For instance, speed sensors generate square waves with variable pulse widths to indicate speed. These signals are usually connected to a GPIO pin configured as an external interrupt or timer capture input, allowing the microcontroller to measure pulse width accurately.

A smart sensor, on the other hand, often supports communication protocols like SPI (Serial Peripheral Interface) or I2C (Inter-Integrated Circuit). These interfaces enable the microcontroller to configure the sensor, check its status, and retrieve data through register reads and writes.

Choosing the appropriate communication protocol for interfacing a sensor depends on the available pins in the system and the specific requirements of the application.

::: tip

When working with protocols like I²C or SPI, using tools such as [<FontIcon icon="fas fa-globe"/>Saleae](https://saleae.com) logic analyzers can greatly simplify debugging and validation. Logic analyzers capture and visualize communication signals, and tools like Saleae offer built-in protocol interpreters to help you decode sensor communication in real time. This can be especially helpful when troubleshooting configuration issues, timing problems, or communication errors during sensor interfacing.

:::

Figure 2 below shows an example of a microcontroller connected to 4 sensors having different interfaces.

![Figure 2: A microcontroller interfacing with different sensors using different communication interfaces.](https://cdn.hashnode.com/res/hashnode/image/upload/v1738828730915/25e62db6-a583-427a-bd77-c61c33990cdf.png)

### Determining Power Requirements

Power requirements are another key consideration when interfacing a sensor. Sensors may operate at different voltages (for example, 3.3V or 5V), so ensuring the microcontroller can accommodate these levels is essential. Level converters can bridge voltage mismatches, ensuring compatibility between the sensor and microcontroller voltage levels.

Timing and sampling requirements must also be evaluated, especially for sensors generating high-frequency data. Configuring external interrupts on GPIO pins can ensure timely data capture, while techniques like using DMA can streamline data transfer for sensors sampling at high frequencies without CPU involvement.

Now that you’ve learned about communication protocols and hardware connections, let’s focus on designing the software architecture that acquires, processes, and prepares sensor data for use. Designing effective software is crucial for obtaining clean, reliable data from the sensor.

---

## Software Architecture

Now that we’ve chosen the sensor and communication protocol, let’s design the software architecture for the sensor pipeline. This software runs on the microcontroller connected to the sensor and processes raw data to make it clean and usable.

While application-level data processing is beyond the scope of this article, let’s focus on interfacing with the sensor and preparing the data for application use.

The sensor processing pipeline can be broken into the following components:

1. Sensor Driver
2. Analog-to-Digital Conversion (ADC) Support
3. Scaling
4. Calibration
5. Data Post-Processing

Let’s examine a high-level overview of these components for both smart and raw sensors.

### High-Level Overview of Components

1. **Sensor Driver**
    - Smart sensors: The driver configures the sensor, manages power, and handles read and write operations to the sensor registers over a communication protocol like SPI, I2C.
    - Raw sensors: The driver may only control GPIOs for power management, as raw sensors typically lack registers.
2. **Analog-to-Digital Conversion (ADC) Support**
    - Smart sensors: Include an onboard ADC, which is configured through the sensor driver.
    - Raw sensors: Requires an external ADC, an ADC driver implemented in software to configure the ADC, initiate conversions, and retrieve data.
3. **Scaling**: Scaling is necessary for both smart and raw sensors. It converts digital counts after the analog to digital conversion into meaningful physical quantities using formulas provided in the sensor data sheet. For example, a temperature sensor will use a formula to convert digital counts to degree Celsius.
4. **Calibration**: Once the measured physical quantity is obtained, calibration adjusts the value by applying offsets, gains, or both to correct errors. This process ensures the sensor output aligns with reference values across its entire measurement range. A detailed discussion of the calibration process will follow in the next section.
5. **Data Post-Processing**: Post-processing techniques, such as filtering are applied to improve data quality and reduce noise. Common filters such as low-pass or high-pass filters can remove unwanted frequency components.

### Accessing Data from the Sensor

The method of accessing data depends on the whether it’s a raw sensor or a smart sensor. Smart sensors will have onboard ADCs and FIFOs. Before delving into how data is accessed, it’s important to first understand sampling frequency.

#### Sampling Frequency

The frequency of taking a measurement from the sensor must follow the [<FontIcon icon="fas fa-globe"/>Nyquist-Shannon sampling theorem](https://allaboutcircuits.com/technical-articles/nyquist-shannon-theorem-understanding-sampled-systems/). It states that the sampling rate must be twice the highest frequency component of the signal to be measured to accurately reconstruct the measured data.

The sampling frequency defines how often the sensor captures data, which affects how the data is accessed. Depending on whether the sensor is a raw sensor or a smart sensor, the approach to handling this sampled data varies.

**Smart Sensors:**

1. Data register: The sensor writes sampled data directly into a register based on the set sample frequency updated during setup. The microcontroller reads this data register based on a data conversion completion interrupt.
2. FIFObBuffer: Some sensors include FIFO (First-In, First-Out) buffers to store multiple data points. When enabled, the FIFO updates at the configured sampling frequency and trigger interrupts when it becomes full or reaches a predefined level.  

The benefits of FIFO include:

1. Power efficiency: The MCU can process data in batches, reducing CPU overhead and allowing it to enter low-power mode during data collection.
2. Sampling and processing rate matching: FIFO buffers help reconcile differences between the sensor’s sampling rate and the MCU’s data processing rate.
3. For MCUs with Direct Memory Access (DMA), data transfer from the sensor to MCU memory can occur without CPU intervention, further reducing power consumption.

**Raw Sensors:**

For raw sensors, the MCU triggers ADC conversions at the sampling frequency, often using a timer interrupt. Data is read upon the ADC conversion complete interrupt, allowing the MCU to sleep during conversions and between samples to save power.

### Sensor Power Management

Power management is critical for energy-sensitive applications. Strategies include:

1. Low-power modes: Many sensors support low-power modes configurable through sensor registers.
2. GPIO-controlled power cycling (Duty-Cycling): For sensors without built-in low-power modes, the microcontroller can toggle the sensor’s power line using a GPIO pin, reducing power consumption further. Figure 3 below shows the diagram of a raw temperature sensor whose power is controlled using a GPIO from the MCU. For example, a temperature sensor in sleep mode can be activated only when temperature readings are required.

![Figure 3: Raw Temperature Sensor Interfacing a MCU](https://cdn.hashnode.com/res/hashnode/image/upload/v1739042040654/1f2d4bbd-f15a-417a-9c79-3b93384e95bd.png)

The above techniques ensure efficient use of power while maintaining the required data sampling rate and sensor responsiveness.

With the high-level architecture in mind, we’ll now dive into the detailed design of each pipeline component.

---

## Detailed Design of Components

In this section, you’ll delve into the key components of the sensor pipeline outlined in the Software Architecture section.

### 1. Sensor Driver

The sensor driver is responsible for managing communication, configuration, power, and data acquisition for both smart and raw sensors.

#### Smart Sensor Driver:

1. Communication driver: Generic I2C or SPI drivers on the MCU can be adapted using wrapper functions to handle sensor-specific requirements, such as 1-byte, 2-byte, or 4-byte transfers.
2. Configuration: Typical tasks include setting the sampling rate, configuring interrupts, managing FIFO buffers, and, if needed, clock settings.
3. Power management: APIs should allow higher software layers to transition sensors between power modes by writing to specific registers or controlling GPIO lines for sensors without built-in power modes.

#### Raw Sensor Driver:

For raw sensors, the driver primarily manages power, often through GPIO-controlled toggling.

### 2. ADC Support

ADC support is required only for raw sensors. In this article, we’re focusing on SAR ADCs, which are commonly embedded in microcontrollers.

#### How SAR ADCs Work?

A SAR ADC converts an analog signal to a digital value over multiple clock cycles, with the number of cycles equal to its bit resolution (for example, 10 cycles for a 10-bit ADC).

#### Key terms related to ADCs:

1. Reference Voltage ($V_{\text{Ref}}$): Represents the maximum voltage the ADC can measure. Analog signals exceeding this limit must be scaled down.
2. Resolution: Determines the smallest detectable voltage change. For example, a 10-bit ADC with a $3.3V$ $V_{\text{Ref}}$ has a resolution of $3.22 mV$

$$
V_{\text{Res}}=\frac{V_{\text{Ref}}}{2^{10}}
$$

The ADC result is stored in a data register, which can then be scaled to meaningful physical units.

### 3. Scaling

Scaling converts ADC counts into meaningful physical values, such as temperature ($^{\circ}C$) or acceleration ($g$) depending on the sensor type. Sensor datasheets typically provide the necessary formulas or lookup tables.

For example, the method to convert a voltage measured by a raw temperature sensor to temperature value is shown below:

$$
\begin{align*}
V_{\text{Measured}}&=\frac{Counts_{\text{ADC}}}{2^{10}}\times{V_{\text{Ref}}}&(\text{Get }V_{\text{Measured}}\text{ from ADC Counts})\\
T_{\text{Measured}}&=V_{\text{Measured}}\times{T_{C/mV}}&(\text{Get Temperature physical value})
\end{align*}
$$

Similarly, a 3-axis accelerometer maps counts on the $X$, $Y$, and $Z$ axes to acceleration values in g or milli-g.

### 4. Calibration

![Figure 4a: Calibration with gain & offset<br/>Figure 4b: Calibration with fixed offset](https://cdn.hashnode.com/res/hashnode/image/upload/v1738829686302/bfa643dc-5e01-4b24-b885-b682acdb11cb.png)

The figure above on the left (4a) is showing Calibration with gain and offset, while the figure above on the right (4b) is showing calibration with fixed offset.

$$
\begin{align*}
x_{\text{calibrated}}&=\text{Gain}\times{x_{\text{raw}}+\text{Offset}}&(\text{Figure 4a - Linear Calibration})\\
x_{\text{calibrated}}&=x_{\text{raw}}+\text{Offset}&(\text{Figure 4b - Fixed offset Calibration})
\end{align*}
$$

Calibration ensures the sensor’s output aligns with reference measurements, correcting for errors introduced by design, materials, or manufacturing.

#### Types of Errors

1. Offset error: A constant deviation of the sensor’s output from the true reference value, regardless of input magnitude.
2. Gain error: A proportional error where the sensor’s output scale deviates from the expected value, causing the output to increase or decrease incorrectly relative to the input.

#### Calibration Methods

1. 2/3-Point calibration: This type of calibration may involve either applying a fixed offset to the raw value or applying both gain and offset. Figure 4a illustrates an example of a gain/offset calibration, while Figure 4b depicts offset calibration. In both figures, the y-axis represents the reference value measured by an accurate instrument, while the x-axis represents the raw value measured by the sensor after ADC.
2. N-Point calibration: Involves multiple points for more complex, non-linear error correction.

#### Implementation

1. Calibration points shall cover the sensor’s entire measurement range for accuracy.
2. Parameters like gain and offset once estimated shall be stored in a non-volatile memory in the system for persistence to be used across power cycles.

### 5. Data Post-Processing

Post-processing covered in this section talks about removing noise and unwanted signal components, which improves data reliability.

#### Filtering

Filtering is the process of removing unwanted frequency components from a signal to improve data quality. There are several different types of filters:

- Low-Pass Filters: Allows low-frequency signals to pass while attenuating high-frequency noise.
- High-Pass Filters: Allows high-frequency signals to pass while attenuating low-frequency noise. (for example, gravitational acceleration in accelerometer data).
- Band-Pass Filters: Retains only signals within a specific frequency range, removing both lower and higher frequencies outside the desired band.

These filters are often implemented as FIR (Finite Impulse Response) or IIR (Infinite Impulse Response) filters. IIR filters are easy to implement and computationally efficient while FIR filters are computationally intensive but have better control over the frequency response.

Here, we will explore a simple low-pass filter known as the Exponential Moving Average (EMA), a type of IIR filter. A moving average filter is a mathematical technique that smooths short-term fluctuations while highlighting longer-term trends.

Unlike other moving average filters, EMA does not require maintaining a buffer, making it more memory-efficient. It is also more responsive to data changes while still providing smoothing, making it well-suited for real-time filtering. EMA assigns greater weight to recent data samples than older ones, allowing it to adapt quickly to changes in sensor readings.

EMA can be calculated like this:

$$
\begin{align*}
\text{EMA}_{t}&=\alpha\times{x_t}+\left(1\alpha\right)\times{\text{EMA}_{t-1}}\\
\alpha&=\frac{2}{\left(N+1\right)}&(\text{Smoothening Factor, }N\text{ - filter window size})
\end{align*}
$$

$$
\begin{cases}
\text{EMA}_{t}&(\text{Exponential Moving Average in current iteration})\\
x_{t}&(\text{New Data Sample in Current Iteration})\\
\text{EMA}_{t-1}&(\text{Exponential Moving Average in the last iteration})
\end{cases}
$$

Now that we understand the Exponential Moving Average (EMA) filter, here are two key factors to consider when tuning it for an application:

- Smoothing vs. Responsiveness: A higher smoothing factor (closer to 1, smaller filter window size) gives more weight to recent data, making the filter more responsive to changes but less effective at noise reduction. A lower smoothing factor (closer to 0, larger filter window size) provides better noise reduction but reacts more slowly to data changes.
- Application-Specific Tuning: The smoothing factor should be chosen based on the sampling rate, sensor sensitivity, and application requirements. Real-time systems often require a balance between quick responsiveness and stable output.

Here’s a code sample for EMA:

```c :collapsed-lines
#include <stdio.h>
#include <stdint.h>

// Exponential Moving Average (EMA) filter implementation
#define FILTER_WINDOW 5

// Function to calculate EMA
float calculateEMA(float ema, float new_value, float alpha) {
    return (alpha * new_value) + (1 - alpha) * ema;
}

int main() {
    float sensorReadings[] = {26.0, 27.5, 28.2, 27.0, 26.8, 26.5, 27.2};
    int numReadings = sizeof(sensorReadings) / sizeof(sensorReadings[0]);

    float alpha = 2.0f / (FILTER_WINDOW + 1); // Standard EMA formula
    float ema = sensorReadings[0];  // Initialize EMA with the first reading

    printf("EMA Filtered Sensor Data:\n");

    for (int i = 0; i < numReadings; i++) {
        ema = calculateEMA(ema, sensorReadings[i], alpha);
        printf("Reading %d: Raw = %.2f, EMA = %.2f\n", i + 1, sensorReadings[i], ema);
    }

    return 0;
}
```

---

## Conclusion

In summary, sensors are the backbone of modern smart devices, bridging the gap between the physical world and digital systems. From consumer electronics to industrial automation and medical devices, they enable devices to perceive and interact with their environments.

Understanding how sensors work, the components of their data pipeline, and their integration with microcontrollers is essential for engineers and hobbyists alike. By designing effective pipelines, developers can ensure accurate, clean, and reliable data, enabling systems to meet performance and power efficiency goals.

If you have questions or want to talk more about this topic, feel free to reach out on [Twitter (<FontIcon icon="fa-brands fa-linkedin"/>`sohamstars`)](https://x.com/sohamstars) or [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`sohambanerjee2`)](https://linkedin.com/in/sohambanerjee2/). Always happy to connect.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Connect, Read, and Process Sensor Data on Microcontrollers – A Beginner's Guide",
  "desc": "In today’s world, computers are ubiquitous and generally serve two primary purposes. The first is general-purpose computing, where they handle a wide range of tasks, including running diverse applications and programs. Examples include laptops, deskt...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/connect-read-process-sensor-data-on-microcontrollers-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

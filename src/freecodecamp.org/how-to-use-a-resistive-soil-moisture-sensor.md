---
lang: en-US
title: "How to Use a Resistive Soil Moisture Sensor"
description: "Article(s) > How to Use a Resistive Soil Moisture Sensor"
icon: iconfont icon-c 
category:
  - C
  - C++
  - Hardware
  - Arduino
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c
  - cpp
  - c++
  - c-plus-plus
  - hw
  - hardware
  - arduino
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use a Resistive Soil Moisture Sensor"
    - property: og:description
      content: "How to Use a Resistive Soil Moisture Sensor"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-a-resistive-soil-moisture-sensor.html
prev: /programming/c/articles/README.md
date: 2025-07-10
isOriginal: false
author:
  - name: Michael Ikoko
    url : https://freecodecamp.org/news/author/michaelikoko/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752106699262/6ae871df-e1fb-4019-a446-9bd8cca1cab0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/c/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Arduino > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/arduino/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use a Resistive Soil Moisture Sensor"
  desc="A resistive soil moisture sensor is a widely used, simple, and affordable way of estimating the amount of water in the soil. In this tutorial, you will learn how to interface a resistive soil moisture sensor with an Arduino UNO microcontroller. You w..."
  url="https://freecodecamp.org/news/how-to-use-a-resistive-soil-moisture-sensor"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1752106699262/6ae871df-e1fb-4019-a446-9bd8cca1cab0.png"/>

A resistive soil moisture sensor is a widely used, simple, and affordable way of estimating the amount of water in the soil.

In this tutorial, you will learn how to interface a resistive soil moisture sensor with an Arduino UNO microcontroller. You will learn about the parts and components of the sensor, how to calibrate the sensor for your soil type, and how to read both analog and digital output data from the sensor.

You will implement two practical examples in this tutorial:

1. The first example illustrates how you can read the analog output data from the sensor and convert the analog reading to a percentage value.
2. The second example illustrates how you can use the digital output from the sensor to determine if the soil is wet or dry, and indicate the result using a red and green LED.

At the end of the tutorial, you will have a solid understanding of how a resistive soil moisture sensor works and how to integrate the sensor into your microcontroller-based projects.

::: note Prerequisites

To effectively follow along with this tutorial, you should have the following components:

- Arduino UNO
- Resistive Soil Moisture Sensor
- Breadboard
- 5 LEDs (any color for the analog example)
- 1 red LED and 1 green LED (for the digital example)
- 220-ohm resistors (one per LED)
- Jumper wires

:::

---

## What is a Soil Moisture Sensor?

A soil moisture sensor is a device that estimates the moisture content in the soil. Soil moisture sensors typically operate by measuring the soil's electrical properties, such as dielectric and resistance. Some soil moisture sensors also use time domain methods to determine the propagation speed of electromagnetic waves through the soil.

Soil moisture sensors have various applications in different fields. These applications include, but are not limited to:

- Climate and environmental research
- Automated/smart irrigation system
- Greenhouse monitoring systems
- Urban planning

---

## Types of Soil Moisture Sensors

Soil moisture sensors are categorized based on the property of the soil that they measure as an indicator of the moisture content. The most common soil moisture sensors for small-scale projects are:

- Resistive soil moisture sensors
- Capacitive soil moisture sensors

### Resistive Soil Moisture Sensor

A resistive soil moisture sensor estimates the moisture content based on the relationship between water content and soil resistivity. The electrical resistivity of the soil reduces exponentially as the water content increases.

The resistive soil moisture sensor has two probes inserted into the soil. It measures the electrical resistance of the soil between the two probes.

### Capacitive Soil Moisture Sensor

A capacitive soil moisture sensor determines the moisture content of the soil based on the relationship between water content and the dielectric properties of the soil. The dielectric constant of a soil increases as the water content increases.

A capacitive soil moisture sensor typically has a positive plate and a negative plate with space between them. When inserted into the soil, the soil becomes the dielectric medium between both plates. The sensor measures the change in the soil's dielectric property.

### How to Choose Between Resistive and Capacitive Sensors

The choice between a resistive and capacitive soil moisture sensor depends on a couple of factors:

- **Cost**: A resistive soil moisture sensor is typically less expensive than a capacitive sensor.
- **Accuracy**: Capacitive soil moisture sensors are more accurate than their resistive counterparts. Factors like soil type and application of fertilizers have a lesser effect on the sensitivity of the capacitive soil moisture sensor.
- **Long-term use**: Resistive soil moisture sensors are prone to corrosion with frequent use. This happens because the current flowing through the probes in contact with the soil causes electrolysis of the metal electrodes in the probes. On the other hand, capacitive soil moisture sensors are resistant to corrosion. This is because the contact plates are embedded in corrosion-resistant materials and don't need to be in direct contact with the soil.

---

## Parts of a Resistive Soil Moisture Sensor

The resistor soil moisture sensor module is usually made of two parts: the sensor probes and the voltage comparator module.

### The Sensor Probes

The probes are the part of the sensor that is placed in the soil. The probes are used to detect the electrical resistance across two points in the soil.

![Sensor probes labelled diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909048810/7c2367b5-872c-4e98-acf8-d8b2f0851f6c.jpeg)

As shown in the diagram above, the sensor probes have the following components:

- **Electrodes**: The metal electrodes conduct current through the soil. When the sensor is powered, current flows from one electrode through the soil to the other electrode and back to the comparator module. The sensor then measures the soil's resistance to the electrical signal flowing through the soil across the electrodes to determine the moisture level.
- **Non-polarized connector pins**: The two connector pins are used to connect the probes to the voltage comparator module. The pins have no polarity and can be connected in any order to the respective connector pins on the voltage comparator module. The probe is connected to the comparator module using female-to-female jumper wires.

### The Voltage Comparator Module

The voltage comparator module interprets the electrical signal from the probes, processes the signals, and provides both analog and digital outputs that can be read by the microcontroller.

![Sensor voltage comparator module labelled diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909173338/454ae6bf-2d34-4131-af88-c990eb988cbd.jpeg)

The voltage comparator module has the following components:

- **LM393 Comparator Chip**: The LM393 comparator is a dual comparator that compares the electrical signal from the probes to a reference set by the potentiometer and produces a digital output. The reference signal corresponds to a certain soil moisture level (threshold) and is set using the potentiometer.
  - The comparator outputs a `HIGH` when the analog signal read from the probes is above the reference, this means the soil has less moisture than the threshold moisture level.
  - The comparator outputs a `LOW` when the analog signal read from the probes is less than the reference; this means the soil has more moisture than the threshold moisture level.
- **Potentiometer**: The potentiometer is used to set the reference electrical signal that is used by the LM393 comparator chip. The potentiometer raises or lowers the threshold moisture level. It consists of a knob that can be turned either clockwise or counterclockwise.
- **Power Indicator (PWR-LED)**: The power indicator is an LED that turns on when the module is powered on.
- **Digital Output Indicator (DO-LED)**: The digital output indicator is an LED that turns on when the sensor detects wet soil. That is, the current moisture level read from the sensor is above the threshold, and the comparator outputs a `LOW`.
- **Power Supply Pin (VCC)**: This pin is used to supply power to the sensor. The sensor module can be powered by a 5V or 3.3V voltage source. You should note that changing the voltage source also changes the analog output from the sensor. In this tutorial, you will be using one of the digital pins to power the sensor. The digital pins of the Arduino output 5V. The sensor typically has an operating current of 15mA, and the Arduino digital output pin can provide a maximum current of 40mA, so it can safely power the sensor.
- **Ground Pin (GND)**: This pin is used to provide a ground reference for the sensor. It is usually connected to any ground pin in your microcontroller.
- **Digital Output Pin (DO)**: The digital output pin outputs a `HIGH` or a `LOW` based on the value obtained from the LM393 comparator. This pin is usually used by a microcontroller to read the digital output of the LM393 comparator.
- **Analog Output Pin (AO)**: The analog output pin provides a 10-bit analog voltage value. The values range from 0 to 1023, and they indicate the moisture level of the soil. Typically, in most sensors, higher analog values indicate drier soil and lower analog values indicate wetter soil.
- **Sensor Probe Connector Pins**: These two pins are used to connect the sensor probes to the voltage comparator module.

---

## How to Calibrate the Sensor for Your Soil

As explained earlier in the article, the resistive soil moisture sensor is sensitive to soil type. This means that it’s important that you calibrate the sensor to the soil type you intend to use it on. You do this to improve the accuracy of your readings on a particular soil.

One way of calibrating the sensor is to determine the possible range of values for the soil type. That means you measure the sensor's output when the soil is totally dry and when the soil is totally wet. You can then use this range of values to map the sensor's reading to a new scale, like a percentage. The following steps describe how you can calibrate the sensor:

### Step 1: Connect the Sensor to the Arduino

![Schematic diagram for soil calibration](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909238974/d84a8df3-52d0-4f5e-90a4-9a4fa6c198fb.jpeg)

Using the image above as a reference, connect the sensor to the Arduino microcontroller as follows:

1. Connect the **VCC** or **Power** pin of the sensor's module to digital pin **7** of the Arduino. This allows you to control the supply voltage to the sensor in the Arduino sketch, ensuring that the sensor is only powered when you want to take a reading. Doing this can help improve the durability of the sensor.
2. Connect the **GND** pin of the sensor's module to a ground pin in the microcontroller.
3. Connect the analog output pin **AO** of the sensor's module to the analog pin **A0** of the Arduino. This is the pin where you will read the analog data from the sensor.
4. Connect the two pins on the probes to the two connector pins on the sensor's module. The connector pins have no polarity.

### Step 2: Upload Calibration Sketch to Microcontroller

Upload the following sketch into the Arduino:

```cpp :collapsed-lines
const int sensorPin = A0; // Analog input pin for sensor
const int powerPin = 7; // Digital pin to power the sensor

int getAverageReading(int analogPin, int powerPin, int samples = 10) {
  long total = 0;

  digitalWrite(powerPin, HIGH); // Power ON sensor
  delay(500); // Wait for sensor to stabilize

  for (int i = 0; i < samples; i++) {                    
 total += analogRead(analogPin);
    delay(10); // Short gap between cycles
 }

  digitalWrite(powerPin, LOW); // Power OFF sensor
  return total / samples;
}

void setup() {
  Serial.begin(9600);

  pinMode(powerPin, OUTPUT);
  digitalWrite(powerPin, LOW); // Ensure sensor is off at start

  Serial.println("Calibration mode: Insert into DRY or WET soil and observe values.");
}

void loop() {
  int avgReading = getAverageReading(sensorPin, powerPin, 20); // Take 20 averaged samples
  Serial.print("Average analog reading: ");
  Serial.println(avgReading);
  delay(2000); // Update every 2 seconds
}
```

In the sketch, you begin by defining the pins for powering the sensor and reading the analog data from the sensor. The digital pin `7` powers the sensor, and the analog pin `A0` reads data from the sensor.

The `getAverageReading` function powers on the sensor, takes multiple readings from the sensor, powers off the sensor, and returns the average of the readings taken. The function has three parameters:

- `analogPin` – The analog input pin, which reads data from the sensor to the microcontroller.
- `powerPin` – The pin used to power the sensor. The sensor is powered only when you want to take a reading.
- `samples` – The number of readings taken from the sensor. This defaults to `10`. You take multiple readings as a way of filtering out noise in the sensor data.

In the `setup` function, you begin by setting the baud rate, which is `9600` for Arduino UNO and differs across different microcontrollers. Then you set the digital pin `7` used to power the sensor as an output pin, and write a `LOW` to the sensor to ensure it is off at the start.

Lastly, in the `loop` function, you get the average analog reading from the `getAverageReading` function and print it to the Serial Monitor. You should note that in the sketch, the readings are taken every 2 seconds – this delay should be longer in a practical application in order to improve the durability of the sensor.

### Step 3: Record the Value for Dry Soil

Insert the sensor's probe into a completely dry soil sample, and record the average analog reading. You can dry the soil by baking it in an oven to remove moisture. Note that you must allow the soil to cool before inserting the sensor's probe. Hot soil may damage the sensor. The analog readings from the sensor differ according to soil type but are typically very high for dry soil. This is what I obtained for a dry soil sample:

![Serial monitor showing analog reading for dry soil](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909305339/35d99200-d169-4419-9292-e54a9c544d77.png)

### Step 4: Record the Value for Wet Soil

Insert the sensor's probe into a completely wet soil sample, and record the average analog reading. The value is typically low when the soil is saturated. This is what I obtained for a wet soil sample:

![Serial monitor showing analog reading for wet soil](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909623291/5478b034-ce56-4f9b-a6d7-758508eb0c1a.png)

You will use these recorded analog values for wet and dry soil in the subsequent section as reference points to map future readings onto a percent scale. In the example provided later in this tutorial, the moisture level is expressed as a percentage, between 0%(dry) and 100%(wet). Using the calibration values ensures that the percentage output accurately reflects the conditions of your soil type.

---

## Example 1 – How to Determine Soil Moisture Level in Percentage from Analog Output

In this example, you will learn how to read the analog data from the soil moisture sensor, convert the analog reading to a percentage value, and visually represent the moisture level using five LEDs.

The analog reading from the sensor is inversely proportional to the soil moisture level. This means that higher analog readings indicate drier soil and lower readings indicate wetter soil.

The LEDs act as a visual indicator of the moisture percentage. The LEDs are lit based on a range of soil moisture levels:

- 1 LED: 0-20% (very dry)
- 2 LEDs: 20-40%
- 3 LEDs: 40-60%
- 4 LEDs: 60-80%
- 5 LEDs: 80-100% (very wet)

### Circuit Diagram

![Circuit diagram for Example 1](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909722810/0aff204d-2ddd-44d5-80b5-5765b9cf5fe9.jpeg)

Using the schematic above as a reference, design the circuit as follows:

1. Connect the sensor to the Arduino in the same way as described in the calibration section. That is, connect the sensor's power pin (VCC) to digital pin 7, analog output pin **AO** to analog pin **A0**, and ground pin to any ground pin of the microcontroller.
2. Connect each of the LEDs in series with a 220-ohm resistor.
3. Connect the anode of the five LEDs to digital pins 3, 4, 5, 6, and 8 of the microcontroller.

This is how my setup looked:

![Physical setup for Project 1](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909770251/226bd848-2a58-4e2f-9bf4-796a54983d47.jpeg)

### Arduino Code

Upload the following sketch to your Arduino:

```cpp :collapsed-lines
const int sensorPin = A0; // Analog input from soil moisture sensor
const int powerPin = 7; // Digital pin to power the sensor

// LED bar pins (from lowest to highest)
const int ledPins[5] = {3, 4, 5, 6, 8};

// Calibrated analog values - replace with your values
const int dryValue = 1005;
const int wetValue = 254;

// Global to hold the last analog value
int lastAnalogReading = 0;

// Read and calculate soil moisture percentage
int getMoisturePercent(int analogPin, int powerPin, int samples = 10) {
  unsigned long total = 0;

  digitalWrite(powerPin, HIGH);
  delay(10); // Allow sensor to stabilize

  for (int i = 0; i < samples; i++) {
 total += analogRead(analogPin);
    delay(10);
 }

  digitalWrite(powerPin, LOW);

  int avgReading = total / samples;
 lastAnalogReading = avgReading;

  int percent = map(avgReading, dryValue, wetValue, 0, 100);
  return constrain(percent, 0, 100);
}

// Update LED states using boolean array
void updateLEDBar(int percent) {
  bool ledStates[5] = {0, 0, 0, 0, 0}; // Default all OFF

  if (percent <= 20) {
    ledStates[0] = true;
 } else if (percent <= 40) {
    ledStates[0] = ledStates[1] = true;
 } else if (percent <= 60) {
    ledStates[0] = ledStates[1] = ledStates[2] = true;
 } else if (percent <= 80) {
    ledStates[0] = ledStates[1] = ledStates[2] = ledStates[3] = true;
 } else {
    for (int i = 0; i < 5; i++) ledStates[i] = true;
 }

 // Write LED states to pins
  for (int i = 0; i < 5; i++) {
    digitalWrite(ledPins[i], ledStates[i] ? HIGH : LOW);
 }
}

void setup() {
  Serial.begin(9600);
  pinMode(sensorPin, INPUT);
  pinMode(powerPin, OUTPUT);
  digitalWrite(powerPin, LOW); // Start with sensor powered off

  for (int i = 0; i < 5; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW); // Ensure all LEDs start OFF
 }

  Serial.println("Soil Moisture Monitor with 5-LED Bar (Boolean Array)");
}

void loop() {
  int moisturePercent = getMoisturePercent(sensorPin, powerPin, 20);

 // Print both analog reading and percent
  Serial.print("Analog Reading: ");
  Serial.print(lastAnalogReading);
  Serial.print("  |  Moisture: ");
  Serial.print(moisturePercent);
  Serial.println(" %");

  updateLEDBar(moisturePercent);

  delay(2000); // Update every 2 seconds
}
```

In the sketch, you start by defining the analog pin for reading data from the sensor and the digital pin for powering the sensor. You also define the following variables, which will be used in the code:

- `ledPins[5]` – An array that stores the digital pins used to power each LED. The pins are arranged from the first LED to the last one. That is the visual display order from left to right.
- `dryValue` – This variable stores the analog value recorded for dry soil during the calibration section.
- `wetValue` – This variable stores the analog value recorded for wet soil during the calibration section.
- `lastAnalogReading` – This variable stores the last reading taken by the sensor. You use this variable to log the actual analog reading to the Serial Monitor.

The `getMoisturePercent` function powers on the sensor, takes multiple readings, powers off the sensor, calculates the average analog reading, represents the analog reading in percent, and returns the percent value. The function also saves the average analog reading to the `lastAnalogReading` variable. You can print it directly here, but this sketch saves it in a separate variable so that you can print it later in the `loop` function for readability.

You can express the average analog reading in percentage with the `map(avgReading, dryValue, wetValue, 0, 100)` function. The function remaps the average reading stored in `avgReading` from the range of your calibration values `dryValue` and `wetValue` to a new range between `0` and `100` (where `0` is the driest and `100` is the wettest). You then use the `constrain` function to keep values within the `0` and `100` range.

The `updateLEDBar` function displays the percent value using the LEDs. The `ledStates` array in the function stores the logic state of each LED. You begin by setting all LEDs off – that is, having a state `0`. The next bit of logic is a simple `if` statement where you turn on the required LEDs corresponding to a particular percent range by setting the elements in the array to `true` (equivalent to `1`). You end the function by writing the states in the `ledStates` to the pins in `ledPins`.

The `setup` function is pretty routine: you set the baud rate for serial communication, define input and output digital pins, and write a `LOW` to the digital output pins to ensure they are all turned off at the start.

In the `loop` function, you call the `getMoisturePercent` function to get the percent moisture value. You then print the percent value and the average analog reading to the Serial Monitor for clarity. Lastly, you call the `updateLEDBar` function with the percent value as a parameter to turn on the respective LEDs to indicate the moisture level.

### Test the System

You can proceed to test the example with different moisture levels. For example:

- At around a 37% moisture level, two LEDs are lit.

![Test example 1 with 37% moisture level](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909854736/5312e441-d9fd-498f-bd87-b902231b27f4.jpeg)

- At about a 76% moisture level, four LEDs are lit.

![Test example 1 with 76% moisture level](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909910096/eabf2f8d-7499-4c6a-be49-74d4c8a3da30.jpeg)

::: info

You can also simulate the example on Tinkercad here:

<SiteInfo
  name="Circuit design soil-sensor-analog-output - Tinkercad"
  desc="Tinkercad is a free, easy-to-use app for 3D design, electronics, and coding."
  url="https://tinkercad.com/embed/6s47ZvIrNOP"
  logo="https://tinkercad.com/favicon.ico"
  preview="https://csg.tinkercad.com/things/6s47ZvIrNOP/t725.png?rev=1751922309525596000&s=&v=1&type=circuits"/>

![Example 1 Tinkercad simulation image](https://cdn.hashnode.com/res/hashnode/image/upload/v1752100775640/12f92988-7697-4069-9068-86f663b20794.png)

:::

---

## Example 2 – How to Determine Soil Moisture State from Digital Output

In the previous project, you learned how to read the analog data from the sensor and convert the value into a percentage. If your application requires a binary output, you can use the digital output pin. In this section, you'll learn how to use the digital output pin of the sensor.

The digital output pin has only two states:

- `LOW` – This state corresponds to 0V and is the output when the soil is wet, that is, the moisture level is above the set threshold.
- `HIGH` – This state corresponds to 5V and is the output when the soil is dry, that is, the moisture level is below the threshold moisture level.

### Circuit Diagram

The example built in this section is very simple. It consists of a red and green LED. When the sensor outputs a `LOW` from the digital output pin, which means the soil is wet, the green LED turns on. When the sensor outputs a `HIGH` from the digital output pin, which means the soil is dry, the red LED turns on.

![Circuit diagram for example 2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751909967743/761e3422-ad95-4f8e-9b4d-4963970c926e.jpeg)

Using the circuit diagram above as a reference, design the circuit as follows:

1. Place the sensor module on the breadboard.
2. As in the previous project, connect the power (VCC) pin of the sensor module to digital pin 7 of the microcontroller, and the ground (GND) pin to a ground pin on the microcontroller.
3. Connect the digital output (DO) pin of the sensor to digital pin 2 of the microcontroller. This pin is where you will read the data from the sensor.
4. Connect the red and green LEDs each to a 220-ohm resistor in series.
5. Connect the anode of the red and green LEDs to digital pins 12 and 13 of the microcontroller, respectively.

This is how my physical connection looked:

![Physical setup for example 2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751910000801/55382b8f-cdd4-4f85-9b6a-342af252329b.jpeg)

### How to Set the Threshold Moisture Level

Before using the digital output pin of the soil sensor module, you first have to set a threshold moisture level.

The sensor's module has a built-in potentiometer that allows you to adjust the moisture level, which will be used as a threshold. The sensor also has a built-in LM393 comparator, which continuously compares the actual reading from the sensor to the threshold set by the potentiometer and outputs the appropriate state.

You can set the threshold moisture level by rotating the knob on the potentiometer. Rotating the potentiometer clockwise lowers the threshold. Rotating the potentiometer counterclockwise raises the threshold. The sensor module also has a built-in LED labeled **DO-LED** that turns on when the sensor output is `LOW`. Set the threshold as follows:

1. Place the sensor's probe in soil just dry enough that it requires irrigation. That is the soil whose moisture level you want to use as a threshold. Note that the DO-LED should be off.
2. Use a small screwdriver to rotate the potentiometer clockwise until the DO-LED comes on. Turning clockwise reduces the threshold level until it is slightly lower than the current moisture level, thereby triggering the digital output indicator (DO-LED) to turn on.
3. Turn the screw slightly counterclockwise just enough to turn the built-in digital LED off. Given that the current moisture level of the soil is dry enough that it needs to be watered, you still want the sensor to read this level as dry. So turning counterclockwise reduces the threshold to a level just above the current moisture level of the soil, which triggers the DO-LED to turn off.

### Arduino Code

Upload the following sketch to the Arduino:

```cpp :collapsed-lines
const int sensorPower = 7; // Digital pin to power the sensor
const int sensorPin = 2; // Digital input from the sensor
const int greenLED = 13; // Green LED pin
const int redLED = 12; // Red LED pin

int getSensorReading(int digitalPin, int powerPin) {  
  digitalWrite(powerPin, HIGH); // Power ON sensor
  delay(500); // Wait for sensor to stabilize

  int reading = digitalRead(digitalPin);

  digitalWrite(powerPin, LOW); // Power OFF sensor
  return reading;
}

void setup() {
  Serial.begin(9600);

  pinMode(sensorPower, OUTPUT);
  pinMode(sensorPin, INPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);

 // Ensure everything starts OFF
  digitalWrite(sensorPower, LOW);
  digitalWrite(greenLED, LOW);
  digitalWrite(redLED, LOW);
}

void loop() {
  int sensorReading = getSensorReading(sensorPin, sensorPower);

  Serial.println("===================================");
  Serial.print("Digital Reading: ");
  Serial.println(sensorReading);

  if (sensorReading == HIGH) {
    Serial.println("Status: Soil moisture is LOW (dry)");
    Serial.println("Action: Water the soil");
    digitalWrite(redLED, HIGH);
    digitalWrite(greenLED, LOW);
 } else {
    Serial.println("Status: Soil moisture is GOOD (wet)");
    Serial.println("Action: No watering needed");
    digitalWrite(greenLED, HIGH);
    digitalWrite(redLED, LOW);
 }

  Serial.println("===================================");
  Serial.println(); 
  delay(2000); // Update every 2 seconds
}
```

In the sketch, you define the digital pin used to read data from the sensor, the digital pins to power the sensor, and the green and red LEDs.

The `getSensorReading` function powers on the sensor, takes the digital reading from the sensor, powers off the sensor, and returns the digital reading taken from the sensor.

The `setup` function is routine: you set the baud rate, define the digital pins as input or output, and write a `LOW` to the output pins to ensure they are off at the start.

In the `loop` function, you call the `getSensorReading` to get the digital reading from the sensor. If the sensor outputs a `HIGH`, you turn on the red LED and print a message that the soil is dry. If the sensor outputs a `LOW`, you turn on the green LED and print a message that the soil is wet.

### Test the System

You can proceed to test the project using different moisture levels. For example:

- For wet soil, that is, if the moisture level is above the threshold, you should have the following output:

![Test example 2 with wet soil](https://cdn.hashnode.com/res/hashnode/image/upload/v1751910035826/19edc7e0-09a2-404a-8ce4-fb978c5b9f6b.jpeg)

- For dry soil, that is, if the moisture level is below the threshold, you should have the following output:

![Test example 2 with dry soil](https://cdn.hashnode.com/res/hashnode/image/upload/v1751910068607/33881bb3-ba7b-41fd-a637-001016298312.jpeg)

::: info

You can also simulate the example on Tinkercad here

<SiteInfo
  name="Circuit design soil-sensor-digital-output - Tinkercad"
  desc="Tinkercad is a free, easy-to-use app for 3D design, electronics, and coding."
  url="https://tinkercad.com/embed/2wHwfKherNz"
  logo="https://tinkercad.com/favicon.ico"
  preview="https://csg.tinkercad.com/things/2wHwfKherNz/t725.png?rev=1751922309525596000&s=&v=1&type=circuits"/>

![Example 2 Tinkercad simulation](https://cdn.hashnode.com/res/hashnode/image/upload/v1752100906816/cd1b3de4-f5e6-4760-ab03-8f46443ba270.png)

:::

---

## Conclusion

In this tutorial, you learned what a resistive soil moisture sensor is, how to calibrate the sensor for your soil type, and how to use the sensor's analog and digital data to determine the moisture level of the soil.

The examples provided a solid foundation for working with the sensor. You can extend these examples into more complex projects, such as an automated irrigation system or remote monitoring of soil moisture.

For projects that require greater accuracy and frequent or sustained sensor operation, you should explore the capacitive sensor.

You can access all the code on [GitHub (<FontIcon icon="iconfont icon-github"/>`michaelikoko/resistive-soil-moisture-sensor`)](https://github.com/michaelikoko/resistive-soil-moisture-sensor).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use a Resistive Soil Moisture Sensor",
  "desc": "A resistive soil moisture sensor is a widely used, simple, and affordable way of estimating the amount of water in the soil. In this tutorial, you will learn how to interface a resistive soil moisture sensor with an Arduino UNO microcontroller. You w...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-a-resistive-soil-moisture-sensor.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

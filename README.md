# 🌡️ TempX Pro: Scientific Temperature Dashboard

[![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Specs.en.html)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![SCT Internship](https://img.shields.io/badge/SCT-Internship_Project-orange)](https://www.skillcrafttechnology.com/)

> **Status:** Mission Success 🟢
> **Version:** 3.0.0 (Cosmic Update)

**TempX Pro** is a modern, responsive web application developed as **Task 1** of the Software Development Internship at **SkillCraft Technology**. It transforms a basic temperature conversion utility into an interactive, scientific dashboard featuring dynamic visualization and physics-aware logic.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [⚙️ Logic & Algorithms](#-logic--algorithms)
- [🎨 UI/UX & Architecture](#-uiux--architecture)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Installation & Setup](#-installation--setup)
- [🤝 Credits](#-credits)

---

## ✨ Key Features

### 1. 🌌 Infinite Dynamic Color Engine
The application uses an **algorithmic HSL (Hue, Saturation, Lightness) model** to calculate a unique, appropriate background color for every single degree of input temperature.
* **Seamless Transition:** Background color shifts smoothly from deep navy (cold) to vibrant orange (hot) via CSS transitions, driven by React State.
* **Molecular Energy:** The ambient background particle animation dynamically speeds up as the temperature rises, simulating increased molecular energy.

### 2. 🔬 Physics State Engine
The application provides real-time scientific context based on the input value, tracked via a dedicated state variable:
* **Benchmarks:** Displays universal facts (e.g., "Freezing Point of Water," "Surface of the Sun") in the main fact box.
* **Visual Feedback:** The entire theme (color, particle speed) is tied to the physics context.

### 3. 📐 Adaptive Visualization
The thermometer visualization is fully responsive and state-driven:
* **Desktop:** Displays a traditional **Vertical Glass Thermometer** where the liquid level adjusts based on the percentage of the temperature range.
* **Mobile:** Automatically switches to a sleek **Horizontal Progress Bar** for optimal screen utilization on smaller devices.

---

## ⚙️ Logic & Algorithms

| Feature | Implementation | Description |
| :--- | :--- | :--- |
| **Conversion** | Pure JavaScript | Handles bi-directional calculations for Celsius, Fahrenheit, and Kelvin. |
| **Color Interpolation** | Custom HSL Function in `.jsx` | Calculates `lightness` based on deviation from the neutral point (20°C). |
| **Responsive Logic** | CSS Media Queries | Dedicated `@media` block to redefine the visualization's orientation and size. |
| **UX Confirmation** | React `useState` & `setTimeout` | Implements a **"tick mark" (✓)** that appears for 1.5s after a copy button is pressed, providing instant user feedback. |

---

## 🎨 UI/UX & Architecture

This project strictly adheres to modern frontend best practices.

* **Architecture:** Component-based structure using React Hooks (`useState`) for centralized data flow.
* **Styling:** **Glassmorphism Design** using `backdrop-filter` and transparent backgrounds for a modern, layered look.
* **Input UX:** Implemented high-contrast input fields with a glowing focus state to ensure the user always knows where they are typing.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (Vite)
* **Language:** JavaScript (ES6+)
* **State Management:** React Hooks
* **Styling:** CSS3 (Animations, Media Queries)
* **Deployment:** Vercel

---

## 🚀 Installation & Setup

Follow these steps to explore the scientific dashboard locally.
1. Clone the Repository
```bash
git clone [https://github.com/threesshad-cpu/SCT_SD_1.git](https://github.com/threesshad-cpu/SCT_SD_1.git)
cd SCT_SD_1
```
2. Install Dependencies

```Bash

npm install
```
3. Launch the Application

```Bash

npm run dev
```
The application will be available at http://localhost:5173 (and deploy it in vercel or any other platform)

## Deployment Link : https://sct-sd-1-k8ds.vercel.app/ (<-checkout)

## 🤝 Credits
* **Developer:** Threessha D
* **Role:** Software Development Intern
* **Organization:** SkillCraft Technology
* **Project ID:** SCT_SD_1

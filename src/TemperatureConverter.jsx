import React, { useState, useEffect } from 'react';
import './TemperatureConverter.css';

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');
  
  const [benchmark, setBenchmark] = useState('Enter a temperature to explore.');
  const [particleSpeed, setParticleSpeed] = useState(20);
  const [thermoHeight, setThermoHeight] = useState(0);
  const [copied, setCopied] = useState(null);
  
  // NEW: Dynamic Background State
  const [bgColor, setBgColor] = useState('linear-gradient(135deg, #232526, #414345)');

  // 🎨 INFINITE COLOR LOGIC
  const getDynamicBackground = (c) => {
    const val = parseFloat(c);
    
    // Default / Neutral (Dark Grey) if empty
    if (isNaN(val)) return 'linear-gradient(135deg, #232526, #414345)';

    // Baseline: 20°C is "Neutral"
    let hue = 0; // Red by default
    let lightness = 50; // Standard brightness
    let saturation = 80; 

    const diff = val - 20; // How far from neutral?

    if (diff === 0) {
       // Exact Room Temp: Neutral Grey/White
       return 'linear-gradient(135deg, #bdc3c7, #2c3e50)';
    }
    else if (diff < 0) {
       // COLDER (Blue Spectrum)
       // Hue 220 is Blue. 
       // As it gets colder (diff gets more negative), we darken the lightness.
       // Lightness starts at 90 (White-ish) and drops to 10 (Black-ish)
       hue = 220;
       lightness = Math.max(10, 90 - (Math.abs(diff) * 1.2)); 
    } 
    else {
       // HOTTER (Red Spectrum)
       // Hue 0 is Red.
       // As it gets hotter, lightness drops from 90 to 10.
       hue = 0;
       lightness = Math.max(10, 90 - (Math.abs(diff) * 1.2));
    }

    // Create a smooth gradient using the calculated HSL values
    return `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%), hsl(${hue}, ${saturation}%, ${Math.max(0, lightness - 20)}%))`;
  };

  const updateSystem = (c) => {
    const val = parseFloat(c);
    
    // Update Background Instantly
    setBgColor(getDynamicBackground(val));

    // Thermometer Physics
    let height = ((val + 50) / 170) * 100;
    if (height < 5) height = 5; if (height > 100) height = 100;
    setThermoHeight(height);

    // Particle Speed
    let speed = 20 - ((val + 100) / 50); 
    if (speed < 0.5) speed = 0.5; if (speed > 40) speed = 40;
    setParticleSpeed(isNaN(val) ? 20 : speed);

    if (isNaN(val)) {
      setBenchmark('Enter a temperature to explore.');
      setThermoHeight(0);
      return;
    }

    // Benchmarks
    if (val <= -273.15) setBenchmark('🌌 Absolute Zero: Atoms stop moving.');
    else if (val < -100) setBenchmark('🥶 Cold enough to freeze alcohol.');
    else if (val <= 0) setBenchmark('🧊 Freezing point of water.');
    else if (val > 0 && val < 20) setBenchmark('🧥 Cool Weather.');
    else if (val >= 20 && val < 35) setBenchmark('😊 Comfortable / Room Temp.');
    else if (val >= 35 && val < 100) setBenchmark('🥵 Heatwave / Desert Heat.');
    else if (val >= 100 && val < 500) setBenchmark('☕ Boiling Water.');
    else if (val >= 500 && val < 1500) setBenchmark('🌋 Lava / Magma.');
    else if (val >= 1500 && val < 5500) setBenchmark('🔩 Melting Point of Iron.');
    else if (val >= 5500) setBenchmark('☀️ Surface of the Sun.');
  };

  const handleConversion = (source, value) => {
    if (value === '') {
      setCelsius(''); setFahrenheit(''); setKelvin('');
      updateSystem(NaN);
      return;
    }
    const val = parseFloat(value);
    
    if (source === 'c') {
      setCelsius(value);
      setFahrenheit(Math.round(((val * 9) / 5 + 32) * 100) / 100);
      setKelvin(Math.round((val + 273.15) * 100) / 100);
      updateSystem(val);
    }
    if (source === 'f') {
      setFahrenheit(value);
      const c = ((val - 32) * 5) / 9;
      setCelsius(Math.round(c * 100) / 100);
      setKelvin(Math.round((c + 273.15) * 100) / 100);
      updateSystem(c);
    }
    if (source === 'k') {
      setKelvin(value);
      const c = val - 273.15;
      setCelsius(Math.round(c * 100) / 100);
      setFahrenheit(Math.round(((c * 9) / 5 + 32) * 100) / 100);
      updateSystem(c);
    }
  };

  const copyToClipboard = (text, type) => {
    if(!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  const clearAll = () => {
    setCelsius(''); setFahrenheit(''); setKelvin('');
    updateSystem(NaN);
  };

  return (
    // Apply dynamic background style directly here
    <div className="universe-container" style={{ background: bgColor }}>
      
      <div className="particles" style={{ '--speed': `${particleSpeed}s` }}>
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="glass-dashboard">
        <div className="thermo-section">
           <div className="thermometer-glass">
              <div className="thermometer-liquid" style={{ height: `${thermoHeight}%` }}></div>
           </div>
        </div>

        <div className="content-section">
          <header>
            <h1 className="main-title">Temp<span className="accent">X</span></h1>
            <p className="sub-title">Scientific Converter</p>
            <div className="benchmark-badge">{benchmark}</div>
          </header>

          <div className="inputs-area">
            <div className="input-group">
              <label>Celsius</label>
              <div className="input-box">
                <input type="number" value={celsius} onChange={(e) => handleConversion('c', e.target.value)} placeholder="0" />
                <span className="unit">°C</span>
              </div>
              <button onClick={() => copyToClipboard(celsius, 'c')} className="icon-btn">
                {copied === 'c' ? '✓' : '❐'}
              </button>
            </div>

            <div className="input-group">
              <label>Fahrenheit</label>
              <div className="input-box">
                <input type="number" value={fahrenheit} onChange={(e) => handleConversion('f', e.target.value)} placeholder="32" />
                <span className="unit">°F</span>
              </div>
              <button onClick={() => copyToClipboard(fahrenheit, 'f')} className="icon-btn">
                 {copied === 'f' ? '✓' : '❐'}
              </button>
            </div>

            <div className="input-group">
              <label>Kelvin</label>
              <div className="input-box">
                <input type="number" value={kelvin} onChange={(e) => handleConversion('k', e.target.value)} placeholder="273.15" />
                <span className="unit">K</span>
              </div>
              <button onClick={() => copyToClipboard(kelvin, 'k')} className="icon-btn">
                 {copied === 'k' ? '✓' : '❐'}
              </button>
            </div>
          </div>

          <button className="reset-btn" onClick={clearAll}>RESET SYSTEM</button>
          <div className="id-tag">Intern ID: SCT/DEC25/0792</div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
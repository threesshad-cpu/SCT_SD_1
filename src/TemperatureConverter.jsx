import React, { useState, useEffect } from 'react';
import './TemperatureConverter.css';

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');
  
  // New: Contextual Fact Engine
  const [fact, setFact] = useState('Enter a temperature to see facts.');
  const [theme, setTheme] = useState('neutral');
  
  // New: Thermometer Height Calculation
  const [thermoHeight, setThermoHeight] = useState(0);

  const updateContext = (c) => {
    const val = parseFloat(c);
    
    // 1. Calculate Thermometer Height (Clamped 0% to 100%)
    // Mapping -50C (0%) to 120C (100%) for visual range
    let height = ((val + 50) / 170) * 100;
    if (height < 0) height = 5; // Min height
    if (height > 100) height = 100; // Max height
    setThermoHeight(height);

    // 2. Determine Theme & Facts
    if (isNaN(val)) {
      setFact('Enter a temperature to explore.');
      setTheme('neutral');
      setThermoHeight(0);
      return;
    }

    // Advanced "Universe Context" Logic
    if (val < -273.15) { setFact('⚠️ Physically Impossible (Below Absolute Zero)'); setTheme('error'); }
    else if (val === -273.15) { setFact('🌌 Absolute Zero: Atoms stop moving.'); setTheme('cold'); }
    else if (val < -100) { setFact('🥶 Cold enough to freeze alcohol.'); setTheme('cold'); }
    else if (val <= 0) { setFact('🧊 Freezing point of water.'); setTheme('cold'); }
    else if (val > 0 && val < 20) { setFact('🧣 Chilly / Cool weather.'); setTheme('cool'); }
    else if (val >= 20 && val < 30) { setFact('😊 Room Temperature / Comfortable.'); setTheme('moderate'); }
    else if (val >= 30 && val < 45) { setFact('🥵 Hot Summer / Heatwave.'); setTheme('warm'); }
    else if (val >= 100 && val < 1000) { setFact('☕ Boiling Point of Water.'); setTheme('hot'); }
    else if (val >= 1000 && val < 5000) { setFact('🌋 Lava / Melting Point of Gold.'); setTheme('hot'); }
    else if (val >= 5000) { setFact('☀️ Surface of the Sun.'); setTheme('solar'); }
  };

  const handleConversion = (source, value) => {
    if (value === '') {
      setCelsius(''); setFahrenheit(''); setKelvin('');
      updateContext(NaN);
      return;
    }
    const val = parseFloat(value);
    
    if (source === 'c') {
      setCelsius(value);
      setFahrenheit(Math.round(((val * 9) / 5 + 32) * 100) / 100);
      setKelvin(Math.round((val + 273.15) * 100) / 100);
      updateContext(val);
    }
    if (source === 'f') {
      setFahrenheit(value);
      const c = ((val - 32) * 5) / 9;
      setCelsius(Math.round(c * 100) / 100);
      setKelvin(Math.round((c + 273.15) * 100) / 100);
      updateContext(c);
    }
    if (source === 'k') {
      setKelvin(value);
      const c = val - 273.15;
      setCelsius(Math.round(c * 100) / 100);
      setFahrenheit(Math.round(((c * 9) / 5 + 32) * 100) / 100);
      updateContext(c);
    }
  };

  return (
    <div className={`main-wrapper ${theme}`}>
      <div className="glass-dashboard">
        
        {/* LEFT COLUMN: Visual Thermometer */}
        <div className="thermo-container">
          <div className="thermometer-glass">
             <div className="thermometer-liquid" style={{ height: `${thermoHeight}%` }}></div>
          </div>
        </div>

        {/* RIGHT COLUMN: Controls */}
        <div className="controls-container">
          <header>
            <h1 className="logo">Temp<span className="bold">X</span> Pro</h1>
            <p className="id-badge">ID: SCT/DEC25/0792</p>
          </header>

          <div className="fact-box">
            <span className="fact-icon">💡</span>
            <p>{fact}</p>
          </div>

          <div className="inputs-grid">
            <div className="input-card">
              <label>Celsius</label>
              <input type="number" value={celsius} onChange={(e) => handleConversion('c', e.target.value)} placeholder="0"/>
              <span className="unit-tag">°C</span>
            </div>
            <div className="input-card">
              <label>Fahrenheit</label>
              <input type="number" value={fahrenheit} onChange={(e) => handleConversion('f', e.target.value)} placeholder="32"/>
              <span className="unit-tag">°F</span>
            </div>
            <div className="input-card">
              <label>Kelvin</label>
              <input type="number" value={kelvin} onChange={(e) => handleConversion('k', e.target.value)} placeholder="273.15"/>
              <span className="unit-tag">K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
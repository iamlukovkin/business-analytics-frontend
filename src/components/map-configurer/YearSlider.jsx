import React from "react";
import "./year-slider.css";

export const YearSlider = ({ years, selectedYear, onChange }) => {
    if (!years || years.length === 0) return null;

    return (
        <div className="year-slider-container">
            <h2>Время анализа</h2>
            <label htmlFor="year-slider" className="year-slider-label">
                Год: <strong>{selectedYear}</strong>
            </label>
            <input
                id="year-slider"
                className="year-slider"
                type="range"
                min={years[0]}
                max={years[years.length - 1]}
                step={1}
                value={selectedYear}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <div className="year-slider-minmax">
                <span>{years[0]}</span>
                <span>{years[years.length - 1]}</span>
            </div>
        </div>
    );
};

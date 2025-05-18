export function LogoSvg({ width = 60, height = 52 }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 300 260"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Hexagon logo"
            role="img"
        >
            <style>{`
        .hex {
          fill: #AD5AFDFF;
          stroke: white;
          stroke-width: 3;
          transition: fill 0.3s;
        }
        .hex:hover {
          fill: #AD5AFDFF;
        }
      `}</style>

            <g id="hex" transform="translate(0,0)">
                <polygon
                    className="hex"
                    points="30,0 60,17.32 60,51.96 30,69.28 0,51.96 0,17.32"
                />
            </g>

            <use href="#hex" x="120" y="80" />
            <use href="#hex" x="180" y="80" />
            <use href="#hex" x="150" y="30" />
            <use href="#hex" x="90" y="30" />
            <use href="#hex" x="60" y="80" />
        </svg>
    );
}

export function LayerList({layers, selectedLayerId, onSelectLayer}) {
    return (
        <div className="layer-selector">
            {layers.map(({id, full_name: fullName}) => (
                <label key={id}
                       className={`layer-radio-label ${selectedLayerId === id ? "selected" : ""}`}>
                    <input type="radio"
                           name="layer"
                           value={id}
                           checked={selectedLayerId === id}
                           onChange={() => onSelectLayer(id)}/>
                    {fullName}
                </label>
            ))}
        </div>
    );
}
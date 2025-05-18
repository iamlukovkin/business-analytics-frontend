export function FeatureList({features, selectedFeatureId, onSelectFeature}) {
    return (
        <div className="features-list">
            {features.map(({id: featureId, located_name}) => (
                <label
                    key={featureId}
                    className={`feature-radio-label ${selectedFeatureId === featureId ? "selected" : ""}`}
                >
                    <input type="radio"
                           name="feature"
                           value={featureId}
                           checked={selectedFeatureId === featureId}
                           onChange={() => onSelectFeature(featureId)}
                    />
                    {located_name}
                </label>
            ))}
        </div>
    );
}
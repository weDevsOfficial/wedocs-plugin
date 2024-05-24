import { BaseControl } from '@wordpress/components';

const RadioImageControl = ({ selected, options, onChange }) => {
    return (
        <BaseControl>
            <div className="radio-image-control-options">
                {options.map((option) => (
                    <div key={option.value} className="radio-image-option">
                        <input
                            type="radio"
                            id={`radio-image-${option.value}`}
                            value={option.value}
                            checked={selected === option.value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        <label htmlFor={`radio-image-${option.value}`}>
                            {option.icon && <i className={`dashicons ${option.icon}`}></i>}
                            {option.img && <img src={option.img} alt={option.label} />}
                            {option?.svg}
                        </label>
                    </div>
                ))}
            </div>
        </BaseControl>
    );
};

export default RadioImageControl;

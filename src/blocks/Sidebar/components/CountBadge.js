const CountBadge = ({ count, attributes }) => {
    const { countBadgeStyles } = attributes;
    
    // Helper function to get color value or fallback
    const getColorValue = (colorValue, fallback = '') => {
        return colorValue && colorValue.trim() !== '' ? colorValue : fallback;
    };
    
    const badgeStyle = {
        backgroundColor: getColorValue(countBadgeStyles.backgroundColor),
        borderRadius: countBadgeStyles.borderRadius || ''
    };

    if (count === 0) {
        return null;
    }

    return (
        <span 
            className="wedocs-count-badge text-xs px-2 py-1 text-white"
            style={badgeStyle}
            aria-label={`${count} articles`}
        >
            {count}
        </span>
    );
};

export default CountBadge;

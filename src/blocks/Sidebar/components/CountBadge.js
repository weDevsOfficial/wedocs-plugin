const CountBadge = ({ count, attributes }) => {
    const { countBadgeStyles } = attributes;
    
    const badgeStyle = {
        backgroundColor: countBadgeStyles.backgroundColor || '#6c757d',
        borderRadius: countBadgeStyles.borderRadius || '12px'
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

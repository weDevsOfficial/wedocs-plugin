import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

const Save = ({ attributes }) => {
    const {
        hideSearch,
        searchWidth,
        placeholder,
        alignment,
        buttonText,
        showButton,
        buttonPosition,
        buttonBackgroundColor,
        buttonTextColor,
        buttonHoverBackgroundColor,
        buttonHoverTextColor,
        buttonBorderRadius,
        buttonPadding,
        inputBorderRadius,
        iconSize,
    } = attributes;

    if (hideSearch) {
        return null;
    }

    const blockProps = useBlockProps.save({
        className: `wedocs-search-block align-${alignment}`,
    });

    const searchContainerStyles = {
        display: 'flex',
        justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
        width: '100%',
    };

    const searchWrapperStyles = {
        display: 'flex',
        flexDirection: buttonPosition === 'outside' ? 'row' : 'relative',
        width: searchWidth,
        gap: buttonPosition === 'outside' ? '8px' : '0',
    };

    const inputStyles = {
        width: '100%',
        borderRadius: inputBorderRadius,
        paddingRight: showButton && buttonPosition === 'inside' ? '50px' : '16px',
    };

    const buttonStyles = {
        backgroundColor: buttonBackgroundColor,
        color: buttonTextColor,
        borderRadius: buttonBorderRadius,
        padding: buttonPadding ? `${buttonPadding.top} ${buttonPadding.right} ${buttonPadding.bottom} ${buttonPadding.left}` : '12px 24px',
        border: 'none',
        cursor: 'pointer',
        position: buttonPosition === 'inside' ? 'absolute' : 'relative',
        right: buttonPosition === 'inside' ? '4px' : 'auto',
        top: buttonPosition === 'inside' ? '50%' : 'auto',
        transform: buttonPosition === 'inside' ? 'translateY(-50%)' : 'none',
        whiteSpace: 'nowrap',
        '--hover-bg': buttonHoverBackgroundColor,
        '--hover-color': buttonHoverTextColor,
    };

    const searchIconSvg = (
        <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <div {...blockProps}>
            <div style={searchContainerStyles}>
                <form
                    className="wedocs-search-form"
                    role="search"
                    method="get"
                    action={typeof window !== 'undefined' ? window.location.origin : ''}
                    style={searchWrapperStyles}
                >
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input
                            type="search"
                            className="wedocs-search-input"
                            placeholder={placeholder}
                            name="s"
                            style={inputStyles}
                        />
                        <input type="hidden" name="post_type" value="docs" />
                        {showButton && buttonPosition === 'inside' && (
                            <button
                                type="submit"
                                className="wedocs-search-button wedocs-search-button-inside"
                                style={buttonStyles}
                            >
                                {buttonText || searchIconSvg}
                            </button>
                        )}
                    </div>
                    {showButton && buttonPosition === 'outside' && (
                        <button
                            type="submit"
                            className="wedocs-search-button wedocs-search-button-outside"
                            style={buttonStyles}
                        >
                            {buttonText || searchIconSvg}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Save;

import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    ColorPicker,
} from '@wordpress/components';

const ListItems = ({ attributes, setAttributes }) => {
    return (
        <PanelBody title={__('List Items', 'dynamic-table-of-contents-block-wp')} initialOpen={false}>
            <h4>{__('TOC Container', 'dynamic-table-of-contents-block-wp')}</h4>
            <div style={{ marginBottom: '20px' }}>
                <label>{__('Background Color', 'dynamic-table-of-contents-block-wp')}</label>
                <ColorPicker
                    color={containerBackgroundColor}
                    onChange={(value) => setAttributes({ containerBackgroundColor: value })}
                />
            </div>
            {/* <ColorsControls
                        attributes={attributes}
                        setAttributes={setAttributes}
                        device='desktop'
                    /> */}
        </PanelBody>
    );
};

export default ListItems;

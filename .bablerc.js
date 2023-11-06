// .babelrc.js
module.exports = {
    plugins: [
        [
            '@wordpress/babel-plugin-import-jsx-pragma',
            {
                scopeVariable: 'createElement',
                scopeVariableFrag: 'Fragment',
                source: '@wordpress/element',
                isDefault: false,
            },
        ],
        [
            '@babel/plugin-transform-react-jsx',
            {
                pragma: 'createElement',
                pragmaFrag: 'Fragment',
            },
        ],
    ],
};

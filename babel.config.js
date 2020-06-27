const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                "esmodules": true
            },
            useBuiltIns: "usage",
            corejs: 3
        }
    ]
];

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread"
];

module.exports = { presets, plugins };

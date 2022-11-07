var path = require('path');
const {override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isDevelopment = process.env.NODE_ENV !== 'production';
function hotLoverOverride(config, env) {
    let hotLoader = config.module.rules[2].oneOf;
    console.log(config.module.rules[2].oneOf)
    hotLoader.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
            // ... other loaders
            {
                loader: require.resolve('babel-loader'),
                options: {
                    // ... other options
                    plugins: [
                        // ... other plugins
                        isDevelopment && require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                },
            },
        ],
    })
    isDevelopment && config.plugins.push(
        new ReactRefreshWebpackPlugin(),
    )
    return config
}

// ... your other imports
module.exports = override (
    // addCdn(),
    // addCommonsChunkPlugin(),
    // addAnalyzer(),
    hotLoverOverride,
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    // add an alias for "our" imports
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@redux': path.resolve(__dirname, 'src/redux')
    })
);



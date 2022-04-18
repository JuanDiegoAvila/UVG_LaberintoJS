import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: 'dist',
        },
        compress:true,
        port: 9000,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'styles.css' }),
    ],
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [{loader : 'babel-loader'},
                {
                    loader: '@linaria/webpack-loader',
                    options: {
                        sourceMap: process.env.NODE_ENV !== 'production'
                    }
                }
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    {
                      loader: 'css-loader',
                      options: {
                        sourceMap: process.env.NODE_ENV !== 'production'
                      },
                    },
                  ],
              }
        ],
    
    },
}
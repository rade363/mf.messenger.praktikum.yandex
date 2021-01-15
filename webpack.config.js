const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        path.join(__dirname, "/src/assets/js/index.ts"),
        path.join(__dirname, "/src/assets/scss/main.scss")
    ],
    output: {
        path: path.resolve(__dirname, "./static/assets/js"),
        filename: "index.js"
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                        },
                    }
                ],
                exclude: /node_modules/
            },
            {
                test:/\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    context: path.resolve(__dirname, "src/"),
                    outputPath: "../img/",
                    publicPath: "../img/",
                    useRelativePaths: true
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/style.css"
        })
    ]
};
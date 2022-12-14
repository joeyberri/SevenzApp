// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
// };

{
  module: {
    rules: [
      // ... other rules omitted
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              // enable CSS Modules
              modules: true,
              // customize generated class names
              localIdentName: "[local]_[hash:base64:8]",
            },
          },
        ],
      },
    ];
  }
}

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ["./src/index.js"];
    config.resolve = { extensions: [".js", ".ts", ".json"] };

    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
    });

    return config;
  },
};

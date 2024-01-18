// webpack.config.js

const path = require('path');

module.exports = {
  // ... 다른 설정 ...

  module: {
    rules: [
      // ... 다른 로더 설정 ...

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'Chuu.jpeg',
              outputPath: 'src/components/ImageButton/',
            },
          },
        ],
      },
    ],
  },

  // ... 다른 설정 ...
};

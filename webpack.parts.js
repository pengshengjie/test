var path = require('path');
module.exports =
{

  resolve:
  {
    alias:
    {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@redux': path.resolve(__dirname, 'src/redux')
    }
  },
}

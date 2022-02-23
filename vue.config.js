module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'https://tco-dev.evrazsteelbuilding.ru/',
  },
};

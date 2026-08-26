const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

config.resolver.alias = {
  ...(config.resolver.alias ?? {}),

  components: path.resolve(__dirname, 'src/components'),
  View: path.resolve(__dirname, 'src/View'),
  state: path.resolve(__dirname, 'src/state'),
  utils: path.resolve(__dirname, 'src/utils'),
  properties: path.resolve(__dirname, 'src/properties'),
  types: path.resolve(__dirname, 'src/types'),
  src: path.resolve(__dirname, 'src')
}

module.exports = config

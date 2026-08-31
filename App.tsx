import React from 'react'
import { Platform } from 'react-native'
import { TamaguiProvider } from '@gparr1/design-system'

import AppWeb from './src/App.web'
import AppNative from './src/App.native'

export default function App() {
  const app = Platform.OS === 'web' ? <AppWeb /> : <AppNative />

  return (
    <TamaguiProvider theme={'dark'} defaultTheme={'dark'}>
      {app}
    </TamaguiProvider>
  )
}

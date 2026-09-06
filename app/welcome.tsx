import { Platform, Text } from 'react-native'
import { router } from 'expo-router'
import Page from 'structure/Page/Page'
import AuthView from 'View/AuthView'
import React from 'react'
import { TamaguiProvider } from '@gparr1/design-system'
import AppWeb from 'App.web'
import App from '../App'
import AppNative from 'App.native'

export default function Welcome() {
  const app = Platform.OS === 'web' ? <AppWeb /> : <AppNative />

  return (
    <TamaguiProvider theme={'dark'} defaultTheme={'dark'}>
      {app}
    </TamaguiProvider>
  )
}
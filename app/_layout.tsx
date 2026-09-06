import React from 'react'
import { Stack } from 'expo-router'
import { TamaguiProvider } from '@gparr1/design-system'
import AppProviders from 'AppProviders'

export default function RootLayout() {
  return (
    <AppProviders>
      <TamaguiProvider theme="dark" defaultTheme="dark">
        <Stack screenOptions={{ headerShown: false }} />
      </TamaguiProvider>
    </AppProviders>
  )
}
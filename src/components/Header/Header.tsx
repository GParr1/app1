import React from 'react'
import {
  Header as TamaguiHeader,
} from '@gparr1/design-system'

import { Assets } from 'assets/assets'
import { doSignOut } from 'utils/authUtils'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'
import { router } from 'expo-router'

const Header: React.FC = () => {
  const user = useSelector(getUser)
  const uid = user?.user?.uid || ''
  const tamaguiHeaderConfig = {
    title: 'MINILIGA',
    onlyLogo: !uid,
    logoProps: {
      src: Assets.logo,
      width: 48,
      height: 48,
      objectFit: 'contain',
      'aria-label': 'MiniLiga Logo'
    },
    navItems: [
      {
        label: 'Home',
        onPress: () => router.push('/welcome')
      },
      {
        label: 'Teams',
        onPress: () => console.log('Teams'),
        disabled: true
      },
      {
        label: 'Partite',
        onPress: () => router.push('/partite')
      }
    ],
    actionItems: [
      {
        name: 'account_circle',
        onPress: () => router.push('/profile')
      },
      {
        name: 'settings',
        onPress: () => console.log('settings'),
        disabled: true
      },
      ...(uid
        ? [
            {
              name: 'logout',
              onPress: async () => await doSignOut()
            }
          ]
        : [])
    ]
  }
  return <TamaguiHeader {...tamaguiHeaderConfig}></TamaguiHeader>
}

export default Header

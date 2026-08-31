import React from 'react'
import { Header as TamaguiHeader } from '@gparr1/design-system'
import { useNavigate } from 'react-router-dom'
import { Assets } from 'assets/assets'
import { doSignOut } from 'utils/authUtils'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'

const Header: React.FC = () => {
  const user = useSelector(getUser)
  const navigate = useNavigate()
  const uid = user?.user?.uid || ''
  const tamaguiHeaderConfig = {
    title: 'MINILIGA',
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
        onPress: () => navigate('/dashboard')
      },
      {
        label: 'Teams',
        onPress: () => console.log('Teams'),
        disabled: true
      },
      {
        label: 'Partite',
        onPress: () => navigate('/partite')
      }
    ],
    actionItems: [
      {
        name: 'account_circle',
        onPress: () => navigate('/profile')
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

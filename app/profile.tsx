import React from 'react'
import PageAuthenticated from 'structure/Page/PageAuthenticated'
import MyAccountView from 'View/MyAccountView'

export default function Profile() {
  return (
    <PageAuthenticated>
      <MyAccountView />
    </PageAuthenticated>
  )
}

import React from 'react'
import PageAuthenticated from 'structure/Page/PageAuthenticated'
import ConfirmProfileView from 'View/ConfirmProfileView'

export default function ConfirmProfile() {
  return (
    <PageAuthenticated>
      <ConfirmProfileView />
    </PageAuthenticated>
  )
}

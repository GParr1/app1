import React from 'react'
import PageAuthenticated from 'structure/Page/PageAuthenticated'
import MatchesView from 'View/MatchesView'

export default function Partite() {
  return (
    <PageAuthenticated>
      <MatchesView />
    </PageAuthenticated>
  )
}

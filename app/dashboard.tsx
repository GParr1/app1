import React from 'react'
import PageAuthenticated from 'structure/Page/PageAuthenticated'
import Dashboard from 'View/Dashboard'

export default function DashboardPage() {
  return (
    <PageAuthenticated>
      <Dashboard />
    </PageAuthenticated>
  )
}

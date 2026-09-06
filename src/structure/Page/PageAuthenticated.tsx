import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'
import { PageAuthenticatedProps } from 'structure/Page/types'
// import { Navigate } from 'react-router-dom'
import { Redirect } from 'expo-router'
import Page from 'structure/Page/Page'

const PageAuthenticated: FC<PageAuthenticatedProps> = (props) => {
  const user = useSelector(getUser) || null

  const content = user ? (
    <Page {...props}/>
  ) : (
    <Redirect href="/welcome" />
  )

  return <>{content}</>
}

export default PageAuthenticated
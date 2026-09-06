import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'
import { router } from 'expo-router'

export const RedirectOnLogin = () => {
  const user = useSelector(getUser)

  useEffect(() => {
    const isLogin = !!user
    if (isLogin) {
      router.push('/dashboard')
    } else if (user?.displayName) {
      if (user.displayName) {
        router.push('/profile')
      }
    } else {
      router.push('/login',)
    }
  }, [user])

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '200px' }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        aria-label="Caricamento in corso"
      >
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  )
}

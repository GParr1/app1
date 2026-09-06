import { ReactNode } from 'react'

export interface PageProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export interface PageAuthenticatedProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}
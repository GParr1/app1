import React, { ReactNode } from 'react'
import { Container as TamaguiContainer } from '@gparr1/design-system'

import {
  FlexAlignItems,
  FlexJustifyContent
} from 'components/core/Container/enum'

interface MainContainerProps {
  children: ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const mainContainerConfig = {
    render: 'main' ,
    alignItems: FlexAlignItems.CENTER,
    justifyContent: FlexJustifyContent.CENTER
  }
  return (
    <TamaguiContainer {...mainContainerConfig}>{children}</TamaguiContainer>
  )
}

export default MainContainer

import React, { FC } from 'react'
import Header from 'components/Header/Header'
import MainContainer from 'components/Auth/Common/MainContainer'
import FooterContainer from 'components/Auth/Common/FooterContainer'
import { Container as TamaguiContainer } from '@gparr1/design-system'
import { PageProps } from 'structure/Page/types'

const Page: FC<PageProps> = ({ children, showHeader = true, showFooter= true }) => {
  const rootConfig = {
    gap: '$3'
  }

  return (
    <TamaguiContainer {...rootConfig}>
      {showHeader && <Header />}
      <MainContainer>{children}</MainContainer>
      {showFooter && <FooterContainer />}
    </TamaguiContainer>
  )
}
export default Page

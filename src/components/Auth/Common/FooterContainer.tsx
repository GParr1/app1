import React, { ReactNode } from 'react'
import { Container as TamaguiContainer } from '@gparr1/design-system'
import { FlexAlignItems } from 'components/core/Container/enum'

interface FooterContainerProps {
  children?: ReactNode
}

const FooterContainer: React.FC<FooterContainerProps> = ({ children }) => {

  const footerConfig = {
    render: 'footer',
    alignItems: FlexAlignItems.CENTER,
    borderTopWidth:1,
    height: 100
  }

  return (
    <TamaguiContainer {...footerConfig}>
      {children}
    </TamaguiContainer>
  )
}

export default FooterContainer

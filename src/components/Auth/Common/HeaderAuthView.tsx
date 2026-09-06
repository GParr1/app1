import React from 'react'
import { Image, View } from 'react-native';
import { Assets } from 'assets/assets'
import {
  Container as TamaguiContainer,
  Image as TamaguiImage,
  Text as TamaguiText
} from '@gparr1/design-system'
import { ContainerProps, sizesPx, TextAlign } from 'styles';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ImageProps } from 'react-native/Libraries/Image/Image';
import NativeText from 'components/core/NativeText';
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexJustifyContent,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'


interface HeaderAuthViewProps {
  message: string
}

const HeaderAuthView: React.FC<HeaderAuthViewProps> = ({ message }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const viewConfig = {
    width: SizeUnits.FULL,
    alignItems: FlexAlignItems.CENTER,
    gap: '$3'
  }
  const textConfig = getResponsiveStyle({
    textAlign: [TextAlign.CENTER],
  })
  const imageProps = {
    src: Assets.logo,
    width: 120,
    height: 120
  }
  return (
    <TamaguiContainer {...viewConfig}>
      <TamaguiImage {...imageProps} />
      <TamaguiText render={'h1'} {...textConfig}>
        {message}
      </TamaguiText>
    </TamaguiContainer>
  )}

export default HeaderAuthView

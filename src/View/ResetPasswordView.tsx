import React from 'react'
import ResetPassword from 'components/Auth/ResetPassword'
import { Text, View } from 'react-native'
import { borderRadiusSizes, btnDefault, ContainerProps, sizesPx, textDefault } from 'styles'
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent, SizesPx
} from 'components/core/Container/enum'
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView'
import { COLORS } from 'components/constantStyle'
import Button from 'components/core/Button/Button'
import { LoginLabelsProps } from 'properties/authView'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'
import { router } from 'expo-router'

// ✅ Tipizzazione del componente
const ResetPasswordView: React.FC = () => {

  const containerConfig = {
    padding: SizesPx.XL,
    flexDirection: FlexDirection.COLUMN,
    flexAlignItems: FlexAlignItems.CENTER,
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexGap: SizesPx.S,
  }
  const responsiveMainContainer = {
    flexDirection: FlexDirection.COLUMN,
    gap:24,
    flexAlignItems: FlexAlignItems.CENTER,
    width: '100%'
  }
  const { labels } = LoginLabelsProps
  const headerAuthViewProps = {
    message: 'Recupero della password'
  }
  const textConfig = {
    children:
      "Inserisci l'indirizzo e-mail, l'ID o il numero di telefono dell'account\n" +
      'per cui vuoi modificare o impostare una password.',
    style: {
      ...textDefault,
      marginLeft: 5
    }
  }
  const btnBackConfig = {
    touchableOpacityConfig: {
      type: ButtonType.NONE,
      onPress: () => router.push('/welcome'),
      style: {
        ...btnDefault,
        left: 0,
        alignItems: ContainerProps.alignCenter,
        borderRadius: borderRadiusSizes.NONE,
        borderColor: COLORS.primaryText,
        borderWidth: 1,
        alignSelf: 'flex-start',
        zIndex: 1
      },
      accessibilityLabel: labels.backButtonAccessibilityLabel
    },
    label: labels.backButton,
    ioniconsConfig: {
      name: 'chevron-back' as IoniconsNames,
      size: 20,
      color: '#fff'
    }
  } as ButtonProps

  return (
    <Container {...containerConfig}>
      <Button {...btnBackConfig} />
      <HeaderAuthView {...headerAuthViewProps} />
      <Text {...textConfig} />
      <ResetPassword />
    </Container>
  )
}
export default ResetPasswordView


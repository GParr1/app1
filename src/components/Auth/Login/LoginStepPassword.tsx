import React from 'react';
import { useResponsiveStyle } from 'styles/styles.utils';
import { borderRadiusSizes, btnDefault, ContainerProps } from 'styles';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView'
import {
  Container as TamaguiContainer,
  Button as TamaguiButton,
  Text as TamaguiText
} from '@gparr1/design-system'
import GeneralForm from 'components/Form/GeneralForm';
import { maskEmail } from 'utils/utils';
import { COLORS } from 'components/constantStyle';
import { LoginLabelsProps } from 'properties/authView'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'
import { FromType } from 'structure/formUser'

interface LoginStepPasswordProps {
  handleBack: () =>  void
  email: string
  handleLogin: (obj: Record<string, any>) =>  Promise<void>
}

const LoginStepPassword: React.FC<LoginStepPasswordProps> = ({ handleBack, email, handleLogin }) => {

  const { getResponsiveStyle } = useResponsiveStyle();
  const {labels} = LoginLabelsProps
  const headerAuthViewProps = {
    message: labels.insertPass
  }
  const responsiveFormContainer = getResponsiveStyle({
    alignItems: ['center'],
    width: ['100%'],
    padding: [16]
  })
  const btnBackConfig = {
    touchableOpacityConfig: {
      type: ButtonType.NONE,
      onPress: handleBack,
      style: {
        ...btnDefault,
        position: 'absolute',
        left: 0,
        alignItems: ContainerProps.alignCenter,
        borderRadius: borderRadiusSizes.NONE,
        borderColor: COLORS.primaryText,
        borderWidth: 1,
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
    <>
      {/* Pulsante Indietro */}
      <TamaguiButton {...btnBackConfig} />
      {/* 🧭 Header */}
      <HeaderAuthView {...headerAuthViewProps} />
      <TamaguiContainer {...responsiveFormContainer}>
        <TamaguiText textAlign={'center'}>
          Inserisci la password di {maskEmail(email)}
        </TamaguiText>
        <GeneralForm
          formData={FromType.passwordStep}
          handleSubmit={handleLogin}
          labels={{ submitLabel: 'ACCEDI' }}
          obj={{ action: 'email', email }}
        />
      </TamaguiContainer>
    </>
  )
}

export default LoginStepPassword

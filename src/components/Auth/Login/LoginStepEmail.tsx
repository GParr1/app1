import React from 'react';

import Button from 'components/core/Button/Button';
import { btnSecondaryDefault } from 'styles';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import GeneralForm from 'components/Form/GeneralForm';
// import Link, { LinkProps } from 'components/core/Link';
import { LoginLabelsProps } from 'properties/authView'
import { DoFirebaseLoginParms } from 'utils/authUtils'
import { FlexAlignItems, SizesPx, SizesRem, SizeUnits } from 'components/core/Container/enum'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps } from 'components/core/Button/types'
import { FromType } from 'structure/formUser'
import {
  Container as TamaguiContainer
} from '@gparr1/design-system'
import { router } from 'expo-router'

interface LoginStepEmailProps {
  handleLogin: (obj: DoFirebaseLoginParms) => Promise<void>
  handleSetEmail: (obj: Record<string, any>) => void
}
const LoginStepEmail: React.FC<LoginStepEmailProps> = ({ handleLogin, handleSetEmail }) => {

  const { labels } = LoginLabelsProps
  const headerAuthViewProps = {
    message: labels.welcome
  }
  const responsiveFormContainer = {
    alignItems: FlexAlignItems.CENTER,
    gap: SizesRem.L,
    width: SizeUnits.FULL
  }
  const responsiveActionContainer = {
    alignItems: FlexAlignItems.CENTER,
    padding: SizesPx.L
  }
  const btnCreateAccountConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () => router.push('/register'),
      accessibilityLabel: labels.btnCreateAccount,
      style: {
        ...btnSecondaryDefault
      }
    },
    label: labels.btnCreateAccount
  } as ButtonProps

  // const linkConfig = {
  //   to: '/reset-password',
  //   toApp: 'ResetPassword',
  //   label: labels.resetPass
  // } as LinkProps
  return (
    <>
      {/* 🧭 Header */}
      <TamaguiContainer {...responsiveFormContainer}>
        <HeaderAuthView {...headerAuthViewProps} />
        <SocialLogin handleLogin={handleLogin} />
      </TamaguiContainer>

      <DividerLogin />
      <TamaguiContainer {...responsiveFormContainer}>
        <GeneralForm
          formData={FromType.emailStep}
          handleSubmit={handleSetEmail}
          labels={{ submitLabel: 'AVANTI' }}
          obj={{}}
        />
      </TamaguiContainer>
      <TamaguiContainer {...responsiveActionContainer}>
        <Button {...btnCreateAccountConfig} />
        {/*<Link {...linkConfig} />*/}
      </TamaguiContainer>
    </>
  )
}

export default LoginStepEmail

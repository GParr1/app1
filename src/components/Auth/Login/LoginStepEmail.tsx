import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/core/Button/Button';
import { btnSecondaryDefault } from 'styles';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import GeneralForm from 'components/Form/GeneralForm';
import Link, { LinkProps } from 'components/core/Link';
import { LoginLabelsProps } from 'properties/authView'
import { DoFirebaseLoginParms } from 'utils/authUtils'
import { Container } from 'components/core/Container/Container'
import { FlexAlignItems, SizesPx, SizesRem, SizeUnits } from 'components/core/Container/enum'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps } from 'components/core/Button/types'
import { FromType } from 'structure/formUser'
import { YStack, Text as TamaguiText} from 'tamagui'
interface LoginStepEmailProps {
  handleLogin: (obj: DoFirebaseLoginParms) => Promise<void>
  handleSetEmail: (obj: Record<string, any>) => void
}
const LoginStepEmail: React.FC<LoginStepEmailProps> = ({ handleLogin, handleSetEmail }) => {
  const navigate = useNavigate()
  const { labels } = LoginLabelsProps
  const headerAuthViewProps = {
    message: labels.welcome
  }
  const responsiveFormContainer = {
    flexAlignItems: FlexAlignItems.CENTER,
    gap: SizesRem.L,
    width: SizeUnits.FULL
  }
  const responsiveActionContainer = {
    flexAlignItems: FlexAlignItems.CENTER,
    width: ['70%'],
    padding: SizesPx.L
  }
  const btnCreateAccountConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () => navigate('/create-account', { replace: true }),
      accessibilityLabel: labels.btnCreateAccount,
      style: {
        ...btnSecondaryDefault
      }
    },
    label: labels.btnCreateAccount
  } as ButtonProps

  const linkConfig = {
    to:'/reset-password',
    toApp:"ResetPassword",
    label: labels.resetPass,
  } as LinkProps
  return (
    <>
      {/* 🧭 Header */}
      <Container role={'region'} {...responsiveFormContainer}>
        <HeaderAuthView {...headerAuthViewProps} />
        <SocialLogin handleLogin={handleLogin} />
      </Container>

      <TamaguiText >Test Tamgui</TamaguiText>
      <DividerLogin />
      <Container role={'region'} {...responsiveFormContainer}>
        <GeneralForm
          formData={FromType.emailStep}
          handleSubmit={handleSetEmail}
          labels={{ submitLabel: 'AVANTI' }}
          obj={{}}
        />
      </Container>
      <Container role={'region'} {...responsiveActionContainer}>
        <Button {...btnCreateAccountConfig} />
        <Link {...linkConfig} />
      </Container>
    </>
  )
}

export default LoginStepEmail

import React from 'react';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import { Text, View } from 'react-native';
import GeneralForm from 'components/Form/GeneralForm';
// import Link from 'components/core/Link';
import { useResponsiveStyle } from 'styles/styles.utils';
import { TextAlign, textDefault } from 'styles'
import { FORM_REGISTER_STEP_1, FromType } from 'structure/formUser'

interface RegisterStepUserInfoProps {
  handleFirstStep: (obj: Record<string, any>) =>  void
  handleLogin: (obj: Record<string, any>) =>  Promise<void>


}
const RegisterStepUserInfo: React.FC<RegisterStepUserInfoProps> = ({ handleFirstStep, handleLogin }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const headerAuthViewProps = {
    message: 'Crea un account'
  }
  const socialLoginProps = {
    handleLogin
  }
  const responsiveFormContainer = getResponsiveStyle({
    alignItems: ['center'],
    width: ['100%'],
    padding: [16]
  })

  const testConfigProps = {
    children: [
      'Hai già un account? ',
      // <Link
      //   key="login-link"
      //   to="/login"
      //   toApp="Login"
      //   label="Accedi"
      //   testID="login-link"
      // />
    ],
    style: {
      ...textDefault,
      textAlign: TextAlign.CENTER
    }
  }
  return (
    <>
      <HeaderAuthView {...headerAuthViewProps} />
      <SocialLogin {...socialLoginProps} />
      <DividerLogin />
      <View style={{ ...responsiveFormContainer }}>
        <GeneralForm
          formData={FromType.registerStep1}
          handleSubmit={handleFirstStep}
          obj={{}}
        />
        <Text {...testConfigProps} />
      </View>
    </>
  )
}

export default RegisterStepUserInfo
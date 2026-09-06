import React, { useEffect, useState } from 'react'
import { doConfirmPasswordReset, doResetPassword, doVerifyPasswordResetCode } from 'utils/authUtils'
// import {  useSearchParams } from 'react-router-dom'
import { useLocalSearchParams } from 'expo-router'
import GeneralForm from 'components/Form/GeneralForm'
import { cleanUrlParamiter } from 'utils/utils'
import { COLORS } from 'components/constantStyle'
import { Container } from 'components/core/Container/Container'
import { ModalInfoComponent } from 'components/Modal/ModalInfo'
import {
  FlexAlignItems,
  SizesPx,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'
import {
  FORM_EMAIL_STEP,
  FORM_PASSWORD_STEP,
  FromType
} from 'structure/formUser'
import { router } from 'expo-router'

const ResetPassword: React.FC = () => {
  const { oobCode: oobCodeParam } = useLocalSearchParams<{ oobCode?: string }>()

  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [oobCode, setOobCode] = useState<string>('')

  // Step 1: verifica il codice
  useEffect(() => {
    if (!oobCodeParam) return

    doVerifyPasswordResetCode(oobCodeParam).then((result) => {
      const { errorMessage, successMessage } = result

      cleanUrlParamiter()

      if (errorMessage) {
        setError(errorMessage)
      }

      if (successMessage) {
        setOobCode(oobCodeParam)
        setSuccess(successMessage)
      }
    })
  }, [oobCodeParam])

  const handleResetPassword = async (obj: Record<string, any>) => {
    const { email } = obj
    if (!email) {
      setError("Email vuota! Inserisci l'email")
      return
    }
    const { errorMessage, successMessage } = await doResetPassword(email)
    if (errorMessage) setError(errorMessage)
    if (successMessage) setSuccess(successMessage)
  }

  const handleConfirmPasswordReset = async (obj: Record<string, any>) => {
    const { password } = obj
    const { errorMessage, successMessage } = await doConfirmPasswordReset(
      oobCode,
      password
    )
    if (errorMessage) setError(errorMessage)
    if (successMessage) setSuccess(successMessage)
    setTimeout(() => router.push('/login'), 2000)
  }

  const container = {
    flexAlignItems: FlexAlignItems.CENTER,
    gap: SizesRem.L,
    width: SizeUnits.FULL,
    backgroundColor: COLORS.secondaryBg,
    padding: SizesPx.L
  }
  const modalProps = {
    modalTitle: error ? 'Errore' : 'Password Reset',
    type: error ? 'error' : 'success',
    message: error ? error : success,
    closeModal: () => (error ? setError('') : setSuccess(''))
  }

  return (
    <Container {...container}>
      {!oobCode && (
        <GeneralForm
          formData={FromType.emailStep}
          handleSubmit={handleResetPassword}
          obj={{}}
        />
      )}

      {oobCode && (
        <GeneralForm
          formData={FromType.passwordStep}
          handleSubmit={handleConfirmPasswordReset}
          obj={{}}
        />
      )}
      {(error || success) && <ModalInfoComponent {...modalProps} />}
    </Container>
  )
}

export default ResetPassword

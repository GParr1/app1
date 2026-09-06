import React, { useState } from 'react'
import {
  doCreateUserWithEmailAndPassword,
  doFirebaseLogin
} from 'state/auth/operations'
import { manageFirstLogin } from 'utils/utils';
import { FormObject } from 'types/form'
import RegisterStepUserInfo from 'components/Auth/Register/RegisterStepUserInfo';
import RegisterStepEmailPassword from 'components/Auth/Register/RegisterStepEmailPassword';
import Loader from 'components/core/Loader';
import { router } from 'expo-router'

interface RegisterTwoStepsProps {
  setError: (error: string) => void
  setSuccess: (error: string) => void
}

const RegisterTwoSteps: React.FC<RegisterTwoStepsProps> = ({setError, setSuccess}) => {

  const [step, setStep] = useState<number>(1)
  const [formObjectStep1, setFormObjectStep1] = useState<FormObject>({})
  const [loading, setLoading] = useState<boolean>(false)


  const handleFirstStep = (obj:Record<string, any>) => {
    if (!obj.firstName || !obj.lastName) {
      setError('Nome e cognome obbligatori.')
      return
    }
    setFormObjectStep1(obj)
    setStep(2)
  }

  const handleRegister = async (obj: FormObject) => {
    setLoading(true)
    try {
      const { errorMessage, successMessage } =await doCreateUserWithEmailAndPassword({
        account: { ...obj },
        customerInfo: { ...obj }
      })
      if (errorMessage){
        setError(errorMessage)
      }
      if (successMessage) {
        setSuccess('Registrazione completata con successo!')
        setTimeout(() => router.push('/confirm-profile'), 2000)
      }
    }finally {
      setLoading(false)
    }

  }

  const handleLogin = async (obj: Record<string, any>) => {

    const { errorMessage, successMessage } = await doFirebaseLogin({
      action: obj.action
    })
    if (errorMessage) setError(errorMessage)
    if (successMessage) router.push(manageFirstLogin())
  }

  const handleBack = () => {
    setStep(1)
  }
  const registerStepUserInfoProps = {
    handleFirstStep, handleLogin
  }
  const registerStepEmailPasswordProps = {
    handleBack,
    handleRegister,
    formObjectStep1
  }

  return (
    <>
      <Loader visible={loading}/>
      {step === 1 && (
        <RegisterStepUserInfo {...registerStepUserInfoProps} />
      )}
      {step === 2 && (
        <RegisterStepEmailPassword {...registerStepEmailPasswordProps}/>
      )}

    </>
  );
}

export default RegisterTwoSteps

import React, { useState } from 'react';
import Login from 'components/Auth/Login/Login'
import RegisterTwoSteps from 'components/Auth/Register/Register'
import { Container as TamaguiContainer } from '@gparr1/design-system'
import { ModalInfoComponent } from 'components/Modal/ModalInfo'

interface AuthViewProps {
  register?: boolean
}

/**
 * AuthView
 * Visualizza il componente di login o di registrazione in base alla prop `register`.
 * - `register = true` → mostra il form di registrazione
 * - `register = false | undefined` → mostra il form di login
 */
export const AuthView: React.FC<AuthViewProps> = ({ register = false }) => {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const responsiveMainContainer = {
    render: 'section',
    gap: '$3',
  }
  const modalProps = {
    modalTitle: error ? "Errore" : '',
    type: error ? 'error': 'success',
    message: error ? error : success,
    closeModal: () => error ? setError('') : setSuccess('')
  }

  const registerTwoStepsProps = { setSuccess, setError}
  const loginProps = { setSuccess, setError }
  return (
    <TamaguiContainer {...responsiveMainContainer}>
      {register ? (
        <RegisterTwoSteps {...registerTwoStepsProps} />
      ) : (
        <Login {...loginProps} />
      )}
      {error || (success && <ModalInfoComponent {...modalProps} />)}
    </TamaguiContainer>
  )
}

export default AuthView

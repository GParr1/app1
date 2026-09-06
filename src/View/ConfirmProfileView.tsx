import React, { useState } from 'react'
import { handleSaveFormUser } from 'utils/authUtils'
import CardBronze from 'components/FifaCard/CardBronze'
import GeneralForm from 'components/Form/GeneralForm'
import { COLORS } from 'components/constantStyle';
import { CustomerInfo } from 'types/user';
import ImageModal from 'components/FifaCard/ImageModal';
import { dataURLtoFile } from 'components/FifaCard/utils';
import { uploadImage } from 'utils/utils';
import Loader from 'components/core/Loader';
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexDirection,
  FlexWrap,
  SizesPx
} from 'components/core/Container/enum'
import NativeText from 'components/core/NativeText'
import { FORMUSER, FromType } from 'structure/formUser'
import { router } from 'expo-router'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'

/**
 * Tipizzazione parziale per l'oggetto utente.
 * Puoi estendere questa interfaccia in base alla struttura reale del tuo user object.
 */
interface User {
  id?: string
  name?: string
  email?: string
  customerInfo?: Record<string, any>
  userLogin?: Record<string, any>
  [key: string]: any
}

interface ConfirmProfileViewProps {
  user?: User
}

/**
 * ConfirmProfileView
 * Permette all'utente di completare o modificare il proprio profilo.
 * Include una card di anteprima (CardBronze) e un form dinamico (GeneralForm).
 */
export const ConfirmProfileView: React.FC<ConfirmProfileViewProps> = () => {
  const user: User = useSelector(getUser)

  const { customerInfo } = user
  const [dynamicValue, setDynamicValue] = useState<CustomerInfo>(
    customerInfo ?? {}
  )
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const responsiveMainContainer = {
    flexDirection: FlexDirection.ROW,
    flexWrap: FlexWrap.WRAP,
    paddingTop: SizesPx.XL,
    gap: SizesPx.XL,
    alignItems: FlexAlignItems.CENTER
  }

  // Gestione input dinamico
  const handleChange = (obj: Record<string, any>) => {
    setDynamicValue({ ...customerInfo, ...obj })
  }

  // Gestione input dinamico
  const editImage = () => {
    setVisible(true)
    console.log('editImage')
  }

  // Gestione submit del form
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const base64 = dynamicValue.photoURL
      const file = dataURLtoFile(base64, 'profile.png')
      const { result } = await uploadImage({
        user,
        file,
        isDragAndDrop: false
      })
      const updateDynamicValue = { ...dynamicValue, photoURL: result }

      const { errorMessage, successMessage } = await handleSaveFormUser(
        updateDynamicValue,
        customerInfo as CustomerInfo
      )
      if (successMessage) {
        router.push('/dashboard')
      } else if (errorMessage) {
        console.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Loader visible={loading} />
      {visible && (
        <ImageModal
          visible={visible}
          setVisible={setVisible}
          handleChange={handleChange}
        />
      )}
      <Container {...responsiveMainContainer}>
        <Container
          {...{
            flex: 1,
            marginRight: SizesPx.S,
            flexAlignItems: FlexAlignItems.CENTER
          }}
        >
          <CardBronze
            scale={0.7}
            enableEdit={{ editImage }}
            dynamicValue={dynamicValue}
          />
        </Container>
        <Container
          {...{
            flex: 1,
            marginLeft: SizesPx.S
          }}
        >
          <Container
            {...{
              backgroundColor: COLORS.secondaryBg,
              gap: SizesPx.XL,
              paddingVertical: SizesPx.XL,
              flexAlignItems: FlexAlignItems.CENTER,
              borderRadius: SizesPx.S,
              borderColor: COLORS.primaryColor,
              paddingHorizontal: SizesPx.M,
              shadowColor: 'rgba(7, 244, 104, 1)',
              shadowOpacity: 0.4,
              shadowRadius: SizesPx.M
            }}
          >
            <NativeText
              as={'span'}
              style={{
                color: COLORS.primaryText,
                paddingHorizontal: 16,
                fontSize: 28,
                fontWeight: 600
              }}
            >
              {'Completa il tuo profilo'}
            </NativeText>
            <GeneralForm
              formData={FromType.formUser}
              handleChangeInput={handleChange}
              handleSubmit={handleSubmit}
              labels={{ submitLabel: 'SALVA' }}
              obj={customerInfo}
            />
          </Container>
        </Container>
      </Container>
    </>
  )
}

export default ConfirmProfileView

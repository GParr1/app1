import React, { FC, useState } from 'react'
import { FieldsFormStructure, GeneralFormProps } from './types'
import {
  Form as TamaguiForm,
  InputText as TamaguiInputText,
  InputSelect as TamaguiInputSelect,
  InputDate as TamaguiInputDate,
} from '@gparr1/design-system'
import { validateForm } from 'components/Form/utils'
import {
  SizesPx,
} from 'components/core/Container/enum'

/**
 * 🔹 GeneralForm
 * Generatore dinamico di form sulla base della struttura
 * definita in `getFormStructure(formId)`.
 */
const GeneralForm: FC<GeneralFormProps> = ({
  handleSubmit,
  handleChangeInput,
  formData,
  obj = {},
}) => {
  const { id, fields, submitLabel } = formData

  const [formValues, setFormValues] = useState(
    formData.fields.reduce((acc: any, field: FieldsFormStructure) => {
        acc[field.name] = obj[field.name] ?? field.defaultValue ?? ''
      return acc
    }, {})
  )
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const onFormSubmit = () => {
    let { formValid, formErrors } = validateForm(formData, formValues)
    if (!formValid) {
      setErrors(formErrors) // Aggiorna lo stato con gli errori
      return
    }
    handleSubmit?.({ ...obj, ...formValues }) // Passa i dati del form validato
  }

  const handleChange = (name: string, value: string | number) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value
    }))
    handleChangeInput?.({ [name]: value })
  }
  const viewFormConfig = {
    flexGap: SizesPx.S,
    btnConfig: {
      label: submitLabel ?? 'Submit',
      onPress: onFormSubmit
    }
  }

  return (
    <TamaguiForm id={id} {...viewFormConfig}>
      {fields.map((field: any) => {
        const {
          label,
          type,
          name,
          placeholder,
          defaultValue,
          options = [],
          required,
          pattern
        } = field

        switch (type) {
          case 'text':
          case 'email':
          case 'number':
          case 'datetime-local':
          case 'password':
            const inputConfig = {
              type,
              label,
              name,
              placeholder,
              required,
              options,
              defaultValue,
              pattern,
              value: formValues[name],
              errorText: errors[name],
              onChangeText: (value: string) => handleChange(name, value)
            }
            return <TamaguiInputText key={name} {...inputConfig} />
          case 'select':
            return (
              <TamaguiInputSelect
                value={formValues[name]}
                options={options}
                label={label}
                onValueChange={(v: any) => handleChange(name, v)}
              />
            )

          case 'date':
            return (
              <TamaguiInputDate
                key={name}
                mode={'boxes'}
                label={label}
                required={required}
                error={errors[name]}
                value={formValues[name]}
                onChangeText={(date: string) => handleChange(name, date)}
              />
            )
          default:
            return null
        }
      })}
    </TamaguiForm>
  )
}

export default GeneralForm

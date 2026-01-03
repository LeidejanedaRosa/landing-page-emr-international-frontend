import React from 'react'

import { Calendar, Clock, Phone, User } from 'lucide-react'

import { ScheduleCallFormData } from '../types'
import FormInput from './FormInput'

interface ScheduleCallFormProps {
  formData: ScheduleCallFormData
  errors: Partial<ScheduleCallFormData>
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: React.FormEvent) => void
  // eslint-disable-next-line no-unused-vars
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const getMinDate = (): string => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const ScheduleCallForm: React.FC<ScheduleCallFormProps> = ({
  formData,
  errors,
  onSubmit,
  onInputChange,
  onPhoneChange,
}) => {
  return (
    <form onSubmit={onSubmit} className='p-6'>
      <div className='space-y-4'>
        <FormInput
          id='schedule-name'
          name='name'
          type='text'
          label='Nome'
          value={formData.name}
          placeholder='Informe seu nome'
          error={errors.name}
          Icon={User}
          onChange={onInputChange}
        />

        <FormInput
          id='schedule-phone'
          name='phone'
          type='tel'
          label='Telefone'
          value={formData.phone}
          placeholder='(00) 00000-0000'
          error={errors.phone}
          Icon={Phone}
          onChange={onPhoneChange}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormInput
            id='schedule-date'
            name='date'
            type='date'
            label='Data'
            value={formData.date}
            error={errors.date}
            min={getMinDate()}
            Icon={Calendar}
            onChange={onInputChange}
          />

          <FormInput
            id='schedule-time'
            name='time'
            type='time'
            label='Horário'
            value={formData.time}
            error={errors.time}
            Icon={Clock}
            onChange={onInputChange}
          />
        </div>
      </div>

      <button
        type='submit'
        className='mt-6 w-full rounded-lg bg-cta py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cta-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2'
      >
        Enviar Solicitação
      </button>
    </form>
  )
}

ScheduleCallForm.displayName = 'ScheduleCallForm'

export default React.memo(ScheduleCallForm)

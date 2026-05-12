import React from 'react'

import { LucideIcon } from 'lucide-react'

interface FormInputProps {
  id: string
  name: string
  type: 'text' | 'tel' | 'date' | 'time'
  label: string
  value: string
  placeholder?: string
  error?: string
  min?: string
  Icon: LucideIcon
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const INPUT_BASE_CLASSES =
  'w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:outline-none focus:ring-2'
const INPUT_ERROR_CLASSES =
  'border-error focus:border-error focus:ring-error/20'
const INPUT_NORMAL_CLASSES =
  'border-gray-300 focus:border-cta focus:ring-cta/20'

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  error,
  min,
  Icon,
  onChange,
}) => {
  const errorId = `${name}-error`
  const inputClasses = `${INPUT_BASE_CLASSES} ${error ? INPUT_ERROR_CLASSES : INPUT_NORMAL_CLASSES}`

  return (
    <div>
      <label
        htmlFor={id}
        className='mb-1 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='relative'>
        <Icon className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && (
        <p id={errorId} className='mt-1 text-sm text-error' role='alert'>
          {error}
        </p>
      )}
    </div>
  )
}

FormInput.displayName = 'FormInput'

export default React.memo(FormInput)

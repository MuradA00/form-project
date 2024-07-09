import { useForm } from "react-hook-form";
import { formErrorMessageStyles, formItemStyles, inputClassName } from "../../constants";
import { CustomSelect } from "../../components/CustomSelect";
import { useState } from "react";

interface RegisterFormData {
  userName: string;
  userEmail: string;
  phoneNumber: string;
}

export const RegisterForm = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const {
    register,
    clearErrors,
    handleSubmit, 
    formState: {errors}
  } = useForm({
    defaultValues: {
      userName: '',
      userEmail: '',
      phoneNumber: '',
    }
  });
  const {
    userName: nameErrorMessage, 
    userEmail: emailErrorMessage, 
    phoneNumber: phoneErrorMessage
  } = errors || {};

  const onSubmit = (data: RegisterFormData) => {
    if (selectedOption) {
      alert([data.userName, data.userEmail, data.phoneNumber]);
      window.location.reload();
    }
  }
  return (
    <div className="min-h-[100dvh] bg-gray-50 p-4 flex justify-center items-center">
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[460px] shadow-[0_0_6px_rgba(0,0,0,.2)] rounded-lg p-6 w-full flex flex-col gap-4 bg-white">
      <div className={formItemStyles}>
        <div className="text-black/50 font-medium text-sm">
          Your name
        </div>
        <input
          className={inputClassName}
          {...register('userName', {
            required: 'Please enter your name',
            onChange: () => clearErrors('root'),
          })}
          name="userName" 
        />
        {nameErrorMessage && (
          <div className={formErrorMessageStyles}>
            {nameErrorMessage.message}
          </div>
        )}          
      </div>
      <div className={formItemStyles}> 
        <div className="text-black/50 font-medium text-sm">
          Your email
        </div>
        <input
          className={inputClassName}
          {...register('userEmail', {
            required: 'Please enter your email address',
            onChange: () => clearErrors('root'),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {emailErrorMessage && (
          <div className={formErrorMessageStyles}>
            {emailErrorMessage.message}
          </div>
        )}          
      </div>
      <div className={formItemStyles}>
        <div className="text-black/50 font-medium text-sm">
          Your phone number
        </div>
        <input
          className={inputClassName}
          {...register('phoneNumber', {
            required: 'Please enter your phone number',
            pattern: {
              value: /^(?:\+49|0)(?:\s?\d\s?){10,14}$/,
              message: 'Invalid phone number',
            },
            onChange: () => clearErrors('root'),
          })}
          name="phoneNumber"
        />
        {phoneErrorMessage && (
          <div className={formErrorMessageStyles}>
            {phoneErrorMessage.message}
          </div>
        )}          
      </div>
      <div>
      <CustomSelect
        currentItem="How old are you?"
        options={['6', '18', '40']}
        handleOption={(value: string) => setSelectedOption(value)}
      />
      </div>
      <button 
        disabled={!selectedOption}
        type="submit" 
        className="w-full bg-blue-400 rounded-md min-h-[48px] text-white outline-none font-semibold transition-all duration-300 hover:brightness-90 disabled:pointer-events-none disabled:opacity-80 disabled:bg-gray-400"
      >
        Submit
      </button>
    </form>      
  </div>
  )
}
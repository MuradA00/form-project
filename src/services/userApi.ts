import { RegisterFormData } from "../modules/form"
import { $api } from "./interceptor"

export const useUser = () => {
  const sendUserData = async (data: RegisterFormData) => {
    const {userEmail, phoneNumber} = data;
    const response = await $api.post('/api/v1/sign_up', {
      email: userEmail,
      password: '',
      phone: phoneNumber,
    })
    return response;
  }

  return {sendUserData}
}
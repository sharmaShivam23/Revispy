
const BASE_URL = 	import.meta.env.VITE_API_BASE_URL 


export const signUp = {
  SIGNUP_API: `${BASE_URL}/signUp`
}

export const login = {
 LOGIN_API: `${BASE_URL}/login`
}

export const sendOTP = {
  OTP_API: `${BASE_URL}/otp`
}

export const getCategory = {
  GET_CATEGORY : `${BASE_URL}/get-categories`
}

export const postCatgeory = {
  POST_CATEGORY: `${BASE_URL}/create-categories`
}

export const Interest = {
  INTEREST_API : `${BASE_URL}/user/interests`
}

export const DeleteAccount = {
  DELETE_API : `${BASE_URL}/delete-account`
}

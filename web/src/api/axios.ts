import axios from 'axios'

import { store } from 'store'
import { setAuthSuccess } from 'store/authSlice'

export const inst = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api'
})

inst.interceptors.response.use(undefined, (error: any) => {
  // if (error.response?.status === 401) {
  //   store.dispatch(setAuthSuccess({ userData: null, status: null, message: null, isAuth: false }))
  // }

  return Promise.reject(error)
})

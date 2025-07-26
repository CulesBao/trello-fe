/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axiosClient.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  // X-CSRFToken: FGWp2aF83aGv8UNqTUzKom4RwMfsYo5kSqzdHahcsi495vgsyYnzBEgY9OohXcWr

  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const resp = error.response as any
    const respErrorCode = resp?.status ?? 500
    if (respErrorCode === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
    console.log('Axios error:', resp)
    const respErrorMessage = resp?.data?.details?.message ?? 'Unknown error occurred'

    // Show toast notification for errors (except 401 which redirects)
    if (respErrorCode !== 401) {
      toast.error(respErrorMessage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }

    // Return the original axios error instead of creating new Error
    return Promise.reject(error)
  }
)

function $post<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  message?: string,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  const response = axiosClient.post<T, R>(url, data, config)
  if (message) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }
  return response
}

function $get<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosClient.get<T, R>(url, config)
}

function $put<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosClient.put<T, R>(url, data, config)
}

function $patch<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosClient.patch<T, R>(url, data, config)
}

function $delete<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosClient.delete<T, R>(url, config)
}

export { $delete, $get, $patch, $post, $put }

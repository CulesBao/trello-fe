/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import 'vue3-toastify/dist/index.css'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosClient.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  // X-CSRFToken: FGWp2aF83aGv8UNqTUzKom4RwMfsYo5kSqzdHahcsi495vgsyYnzBEgY9OohXcWr

  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`
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
    // Return the original axios error instead of creating new Error
    return Promise.reject(error)
  }
)

function $post<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  const response = axiosClient.post<T, R>(url, data, config)
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

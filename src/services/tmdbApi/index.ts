interface RequestOptions extends RequestInit {
  url: string
  data?: unknown
  isBlob?: boolean
  authorization?: string
}

const baseUrl = import.meta.env.VITE_API_URL
const token = import.meta.env.VITE_API_TOKEN

export const tmdbApi = async <T>({
  url,
  method,
  data,
  headers,
  ...options
}: RequestOptions): Promise<T> => {

  const body = data ? JSON.stringify(data) : undefined

  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body,
    ...options,
  })

  if (!response.ok) {
    const error = await response.text()
    console.log("🚀 ~ error tmdbApi:", error)
    throw new Error(error)
  }

  if (response.status === 204) {
    console.log("🚀 ~ tmdbApi ~ response.status:", response.status)
    return (await response.text()) as unknown as T
  }
  return response.json()
}

const BASE_URL = 'http://localhost:5555'

export const request = async (path, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${path}`, options)

  return response.json()
}

export const apiUrl = 'http://127.0.0.1:7005/api/'

export const apiRequest = async(method = 'GET', url = '', data = {}, headers = {}) => {
  try {
    const options = {
      method: method,
      body: method == 'GET' ? null : JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    let response = await fetch(apiUrl + url, options)
    console.log(`API request successful on ${url}`)
    return await response.json()
  } catch (e) {
    console.log('API request failed', e)
    return false
  }
}

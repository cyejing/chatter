import axios from 'axios'

interface TranslateReq {
  provider: String
  q: String
  from: String
  to: String
}

interface TranslateRet {
  provider: String
  q: String
  from: String
  to: String
  trans: String
}

export async function translate(req: TranslateReq): Promise<TranslateRet | null> {
  try {
    const { data } = await axios.post<TranslateRet>('/api/translate', req, {
      headers: {
        Accept: 'application/json'
      }
    })

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
    } else {
      console.log('unexpected error: ', error)
    }
    return null
  }
}

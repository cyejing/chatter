import axios from 'axios'

interface TranslateReq {
  provider: string
  q: string
  to: string
  from?: string
}

interface TranslateResponse {
  provider: string
  q: string
  from: string
  to: string
  trans: string
}

export async function translate(
  req: TranslateReq
): Promise<TranslateResponse | null> {
  try {
    const { data } = await axios.post<TranslateResponse>(
      '/api/translate',
      req,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )

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

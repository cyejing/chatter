import axios from 'axios'

interface TranslateReq {
  query: string
}

interface TranslateRet {
  code: number
  query: string
  translation: string[]
}

export async function reqdemo() {
  const resp = await axios.get('/api/health', {})
  console.log(resp)
}

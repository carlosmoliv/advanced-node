import { HttpGetClient } from './client'
import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get<T>(args: HttpGetClient.Params): Promise<T> {
    const result = await axios.get(args.url, { params: args.params })
    return result.data
  }
}

import { AxiosInstance } from 'axios';
import { createClient } from '.';

class HttpService {
  client: AxiosInstance;
  constructor(url) {
    this.client = createClient(url);
  }

  async get() {
    const response = await this.client.request({
      method: 'get',
    });

    return response.data;
  }

  async post(data) {
    const response = await this.client.request({
      method: 'POST',
      data,
    });

    return response.data;
  }
}

export default HttpService;

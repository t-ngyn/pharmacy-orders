import HttpService from './HttpService';

class PharmacyService extends HttpService {
  async getPharmacies() {
    const response = await this.client.request({
      url: '/pharmacy',
      method: 'GET',
    });

    return response.data;
  }
}

export default PharmacyService;

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class IamportService {
  async getToken() {
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API키
        imp_secret: process.env.IMP_SECRET, // REST API Secret
      },
    });
    return getToken.data.response.access_token;
  }

  async getData({ impUid }) {
    const getToken = await this.getToken();
    try {
      const data = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'get',
        headers: { Authorization: getToken },
      });
      return data.data.response;
    } catch (error) {
      throw new UnprocessableEntityException('존재하지 않는 결제내역');
    }
  }
}

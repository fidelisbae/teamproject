import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable({})
export class IamportService {
  async getToken() {
    const data = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_API_KEY, // REST API키
        imp_secret: process.env.IMP_API_SECREAT,
      },
    });
    return data.data.response.access_token;
  }

  async getPaymentData({ access_token, imp_uid }) {
    try {
      const data = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
        method: 'get', // GET method
        headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
      });
      return data;
    } catch (error) {
      //console.log(error.response.status);
      throw new UnprocessableEntityException('에러입니다');
    }
  }
  async cancelPayment({
    access_token,
    imp_uid,
    amount: cancel_request_amount,
  }) {
    const data = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: access_token,
      },
      data: {
        imp_uid, // imp_uid를 환불 `unique key`로 입력
        amount: cancel_request_amount, // 가맹점 클라이언트로부터 받은 환불금액
      },
    });
    console.log(data);
  }
}

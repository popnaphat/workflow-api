import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; statusCode: number } {
    return {
      message: 'Welcome to Workflow-api',
      statusCode: 200
    };
  }
}

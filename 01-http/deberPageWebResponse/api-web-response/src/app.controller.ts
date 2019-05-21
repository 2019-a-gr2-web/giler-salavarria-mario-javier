import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/web')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  inicio(@Response() response) {
    return response.render(
      'inicio');
  }
}

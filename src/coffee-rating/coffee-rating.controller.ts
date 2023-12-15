import { Controller, Get, Inject, Optional } from '@nestjs/common';

@Controller()
export class CoffeeRatingController {
  constructor(@Optional() @Inject('CUSTOM_TOKEN') private readonly customToken: string) {
    console.log('customToken = ', customToken);
  }
}

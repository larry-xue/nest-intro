import { Inject, Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';

class ExampleService {
  static showFoo() {
    console.log('foo in example service ?');
  }
}

const customProvider = {
  provide: 'SOME_CUSTOM',
  useValue: 'custom'
}

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService, {
    provide: 'SOME_TOKEN',
    // useValue: ExampleService,
    // useClass: CoffeeRatingService,
    useFactory: async () => {
      return new Promise(resolve => {
        console.log('begin delay...')
        setTimeout(() => {
          console.log('delay done!')
          resolve('Factory');
        }, 5000)
      })
    }
  }, {
      provide: 'FOO',
      useValue: 'BAR'
    }, customProvider],
  exports: [CoffeesModule, 'SOME_CUSTOM'],
})
export class CoffeeRatingModule {
  constructor(@Inject('FOO') private readonly foo: string, @Inject('SOME_TOKEN') private readonly someToken: ExampleService | CoffeeRatingService) {
    if (someToken instanceof ExampleService) {
      ExampleService.showFoo();
    } else if (someToken instanceof CoffeeRatingService) {
      console.log('I am CoffeeRatingService');
    } else {
      console.log('I am use factory');
    }
    // console.log(this.foo);
  }
}

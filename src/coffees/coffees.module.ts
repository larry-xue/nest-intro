import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesEntity } from './entities/coffees.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { EventEntity } from 'src/events/entities/event.entity/event.entity';
import { RoleGuard } from 'src/common/guards/auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, {
    provide: APP_GUARD,
    useClass: RoleGuard,
  }, Reflector],
  imports: [
    TypeOrmModule.forFeature([CoffeesEntity, FlavorEntity, EventEntity]),
  ],
  exports: [CoffeesService],
})
export class CoffeesModule { }

import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesEntity } from './entities/coffees.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { EventEntity } from 'src/events/entities/event.entity/event.entity';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
  imports: [
    TypeOrmModule.forFeature([CoffeesEntity, FlavorEntity, EventEntity]),
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}

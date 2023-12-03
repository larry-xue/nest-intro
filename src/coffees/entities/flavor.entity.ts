import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeesEntity } from './coffees.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FlavorEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => CoffeesEntity, (coffee) => coffee.flavors)
  coffees: CoffeesEntity[];
}

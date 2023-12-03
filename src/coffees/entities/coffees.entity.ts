import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { FlavorEntity } from './flavor.entity';

@Entity() // sql table === 'coffee
export class CoffeesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommandations: number;

  @JoinTable()
  @ManyToMany(() => FlavorEntity, (flavor) => flavor.name, { cascade: true })
  flavors: FlavorEntity[];
}

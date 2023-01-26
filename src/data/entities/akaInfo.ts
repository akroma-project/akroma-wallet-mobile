import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('akaInfo')
export class AkaModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'lastValueUsd', type: 'float', nullable: true, default: 0 })
  lastValueUsd?: Number;
}

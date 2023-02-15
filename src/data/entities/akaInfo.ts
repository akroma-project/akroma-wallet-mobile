/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('akaInfo')
export class AkaModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastValueUsd: number;

  @UpdateDateColumn()
  updated_at: Date;
}

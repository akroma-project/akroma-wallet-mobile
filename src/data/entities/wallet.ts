import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet')
export class WalletModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  address: string;

  @Column({ name: 'lastBalance', type: 'int', nullable: true, default: 0 })
  lastBalance?: Number;

  // @Column({ name: 'name', type: 'varchar', nullable: false })
  // transactions?: number;

  @Column({ name: 'encrypted', type: 'varchar', nullable: false })
  encrypted: string;

  @Column({ name: 'pin', type: 'varchar', nullable: true })
  pin: string;
}

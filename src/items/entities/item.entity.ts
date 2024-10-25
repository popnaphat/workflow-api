import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
export enum ItemStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('int', { nullable: false })
  quantity: number;

  @Column('decimal', { nullable: false })
  amount: number;

  @Column({
      name:"contact_mobile_no",
      nullable: true
  })
  contactMobileNo: string;

  @Column({
    nullable: false,
    default: ItemStatus.PENDING,
  })
  status: ItemStatus;
  
  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the timestamp when a row is created
  timestamp: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedate: Date;
 
  @Column({ nullable: false })
  createdby: string;
}

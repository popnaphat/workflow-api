import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

@Entity('bg_user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    username: string;
    
    @Column({ nullable: false })
    password: string;
    
    @Column({ nullable: false })
    role: Role;
}


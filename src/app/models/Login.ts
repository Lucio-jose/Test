import bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Contact from './Contact';

@Entity('Login')
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @OneToOne(() => Contact, contact => contact, { eager: true })
  @JoinColumn({ name: 'contactId' })
  contactId: Contact;
 
  }

import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import User from "./User";
@Entity('Contact')
class Contact{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    descricao:string;

    @OneToOne(()=>User, user=>user,{eager:true})
    @JoinColumn({name:"userId"})
    userId:User;

    @CreateDateColumn()
    createdAt:Timestamp;

    @UpdateDateColumn()
    updatedAt:Timestamp;
}
export default Contact;

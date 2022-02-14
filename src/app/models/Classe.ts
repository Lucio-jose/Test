import { Column, CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";

@Entity('Classe')
class classe{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int2' })
    number:Number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: 'timestamp';
  
    @UpdateDateColumn()
    updatedAt: 'timestamp';

}
export default classe;
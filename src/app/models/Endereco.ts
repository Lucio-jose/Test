import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('Endereco')
class Endereco{
    @PrimaryGeneratedColumn('uuid')
    id:string;
 
    @Column()
    provincia_id:string;

    @Column()
    municipio_id:string;

    @CreateDateColumn()
    createdAt:Timestamp;

    @UpdateDateColumn()
    updatedAt:Timestamp;
}
export default Endereco;
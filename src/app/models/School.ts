import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { ContentTemplate } from "./shared";
import Endereco from "./Endereco";
import Curso from "./Curso";
import User from "./User";

@Entity('School')
class School extends ContentTemplate{

    @Column()
    nif:string;

    @Column()
    email:string;
    
    @Column()
    typeSchool:string;

    @Column({ type: 'int2' })
    numberStudents:Number;

    @Column({ type: 'int2', nullable:true })
    numberEmployee:Number;

    @ManyToOne(()=>Endereco, endereco=> endereco,{ eager: true, nullable: false })
    @JoinColumn({ name: 'enderecoId' })
    enderecoId: Endereco;

    @ManyToMany(()=>Curso,{nullable: true, eager: true})
    @JoinTable({
        name:'schoolCurso',
        joinColumns:[{name:"schoolId"}],
        inverseJoinColumns:[{name:"cursoId"}]
    })
    cursoId: Curso[];

    @ManyToOne(()=>User, user=> user,{ eager: true, nullable: false })
    @JoinColumn({ name: 'userId' })
    userId: User;
} 
export default School;
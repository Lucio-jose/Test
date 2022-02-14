import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentDates } from "./shared";
import Permissao from "./Permission";

@Entity('Role')
class Role extends ContentDates{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    descricao:string;

    @ManyToMany(()=>Permissao,{nullable: true, eager: true})
    @JoinTable({
        name:'rolePermissao',
        joinColumns:[{name:"roleId"}],
        inverseJoinColumns:[{name:"permissaoId"}]
    })
    permissaoId: Permissao[]; 
} 
export default Role;

import { Entity, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { ContentTemplate } from "./shared";
import Disciplina from "./Disciplina";
import Classe from "./Classe";
import Profissionalismo from "./Profissoinalismo";
 
@Entity('Curso')
class curso extends ContentTemplate{
    @ManyToMany(()=>Disciplina,{nullable: true, eager: true})
    @JoinTable({
        name:'cursoDisciplina',
        joinColumns:[{name:"cursoId"}],
        inverseJoinColumns:[{name:"disciplinaId"}]
    })
    disciplinaId: Disciplina[];

    @ManyToMany(()=>Classe,{nullable: true, eager: true})
    @JoinTable({
        name:'cursoClasse',
        joinColumns:[{name:"cursoId"}],
        inverseJoinColumns:[{name:"classeId"}]
    })
    classeId: Classe[];

  @ManyToMany(() => Profissionalismo, profissionalismo => profissionalismo, {nullable:true, eager: true })
  @JoinTable({
    name:'cursoProfissionalismo',
    joinColumns:[{name:"cursoId"}],
    inverseJoinColumns:[{name:"profissionalismoId"}]
})
profissionalismoId: Profissionalismo[];

}
export default curso;
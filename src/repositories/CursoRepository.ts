import { EntityRepository, Repository } from "typeorm";
import curso from "../app/models/Curso";
  
@EntityRepository(curso)
class CursoRepository extends  Repository<curso>{}
export default CursoRepository;
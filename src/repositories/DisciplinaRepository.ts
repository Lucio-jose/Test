import { EntityRepository, Repository } from "typeorm";
import disciplina from "../app/models/Disciplina";
 
@EntityRepository(disciplina)
class DisciplinaRepository extends Repository<disciplina>{}
export default DisciplinaRepository;
import { EntityRepository, Repository } from "typeorm";
import classe from "../app/models/Classe";
 
@EntityRepository(classe)
class ClasseRepository extends Repository<classe>{}
export default ClasseRepository;
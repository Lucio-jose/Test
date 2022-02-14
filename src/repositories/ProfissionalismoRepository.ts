import { EntityRepository, Repository } from "typeorm";
import Profissionalismo from "../app/models/Profissoinalismo";
 
@EntityRepository(Profissionalismo)
class ProfissionalismoRepository extends Repository<Profissionalismo>{}
export default ProfissionalismoRepository;

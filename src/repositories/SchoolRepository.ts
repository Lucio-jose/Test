import { EntityRepository, Repository } from "typeorm";
import School from "../app/models/School";

@EntityRepository(School)
class SchoolRepository extends Repository<School>{}
export default SchoolRepository;

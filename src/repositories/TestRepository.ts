import { EntityRepository, Repository } from "typeorm";
import test from "../app/models/test";

@EntityRepository(test)
class TestRepository extends Repository<test>{}
export default TestRepository;

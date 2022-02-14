import { EntityRepository, Repository } from "typeorm";
import User from "../app/models/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{}
export default UserRepository;
 
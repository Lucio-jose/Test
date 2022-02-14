import { EntityRepository, Repository } from "typeorm";
import permissao from "../app/models/Permission";
 
@EntityRepository(permissao)
class PermissaoRepository extends Repository<permissao>{}
export default PermissaoRepository;
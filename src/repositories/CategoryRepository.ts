import { EntityRepository, Repository } from "typeorm";
import Category from "../app/models/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category>{}
export default CategoryRepository;

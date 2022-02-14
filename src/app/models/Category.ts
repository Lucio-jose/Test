import { Entity } from "typeorm";
import { ContentTemplate } from "./shared";

@Entity('Category')
class Category extends ContentTemplate{
}
export default Category;


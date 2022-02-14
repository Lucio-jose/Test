import 'reflect-metadata';
import { Entity} from 'typeorm';
import { ContentTemplate } from './shared';

@Entity('typeFile')
class TypeFile extends ContentTemplate {
}
export default TypeFile;
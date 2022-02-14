import 'reflect-metadata';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
import { ContentTemplate } from './shared';
import TypeFile from './TypeFile';
import Category from './Category';

@Entity('FileUser')
export class File extends ContentTemplate {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  path: string;

  @ManyToOne(() => TypeFile, type => type, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'typeId' })
  typeId: TypeFile;

  @ManyToOne(()=>Category, category=>category,{
    nullable: true,
    eager: true,
  })
  @JoinColumn({name: "categorylId"})
  categoryId:Category;

}

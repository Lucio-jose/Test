import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
 
abstract class ContentDates {
  @CreateDateColumn()
  createdAt: 'timestamp';

  @CreateDateColumn()
  updatedAt: 'timestamp';
}
//substituição de nomeclatur prevista de ContentTamplate para DadosComum
abstract class ContentTemplate extends ContentDates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;
}

abstract class DadosComum extends ContentDates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  descricao: string;
}
class DataValidade {
  @Column()
  inicio: Date;

  @Column()
  fim: Date;
}

class DataInput extends ContentDates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  tipoId: string;

  @Column({ type: 'varchar', nullable: true })
  plaeceHolder: string;

  @Column({ type: 'varchar', nullable: true })
  color: string;
}

class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

abstract class DataSchool extends ContentTemplate {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  numberSchool: string;

  @Column({
    type: 'varchar',
  })
  nif: string;
}

abstract class DataUser extends ContentTemplate {
  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  numberDocument: String;

  @Column({ nullable: true })
  genero: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateBorn: Date;
}

abstract class CamposEntradaAluno extends DadosComum {}
abstract class DadosAluno extends ContentTemplate {}
export {
  ContentDates,
  ContentTemplate,
  DadosComum,
  DataValidade,
  Name,
  DataSchool,
  DataUser,
  DataInput,
  CamposEntradaAluno,
};

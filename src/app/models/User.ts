import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Role from "./Role";
import Endereco from "./Endereco";
import { ContentDates } from "./shared";

@Entity('user')
class User extends ContentDates {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'bilhete_de_identidade', nullable: true, type: 'varchar' })
  ticket: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateBorn: Date;

  @Column()
  @ManyToOne(() => Endereco, enderecoId => enderecoId, {
    eager: true,
    nullable: true
  })
  @JoinColumn({ name: 'enderecoId' })
  enderecoId: Endereco;

  @Column()
  @ManyToOne(() => Role, role => role, { eager: true, nullable: true })
  @JoinColumn({ name: 'roleId' })
  roleId: Role;
}
export default User;

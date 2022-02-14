import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Role from "./Role";
import { ContentDates } from "./shared";

@Entity('Test')
class Test extends ContentDates{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
@Column()
name:string;

  @ManyToOne(() => Role, roleId => roleId)
@JoinColumn({ name: 'roleId' })
roleId: Role;
}
export default Test;
 
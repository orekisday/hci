import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserRole } from '../enums/roles.enum';
import { DataEntity } from './data.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  confirmCodeId: number;

  @Column({ nullable: true })
  passwordRecoveryCodeId: number;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => DataEntity, (data) => data.user)
  data: DataEntity;
}

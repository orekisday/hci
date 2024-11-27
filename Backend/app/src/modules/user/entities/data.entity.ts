import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class DataEntity extends BaseEntity {
  @Column({ type: 'int', nullable: true })
  Gender: number;

  @Column({ type: 'int', nullable: true })
  Married: number;

  @Column({ type: 'int', nullable: true })
  Dependents: number;

  @Column({ type: 'int', nullable: true })
  Education: number;

  @Column({ type: 'int', nullable: true })
  Self_Employed: number;

  @Column({ type: 'float', nullable: true })
  ApplicantIncome: number;

  @Column({ type: 'float', nullable: true })
  CoapplicantIncome: number;

  @Column({ type: 'float', nullable: true })
  LoanAmount: number;

  @Column({ type: 'float', nullable: true })
  Loan_Amount_Term: number;

  @Column({ type: 'float', nullable: true })
  Credit_History: number;

  @Column({ type: 'int', nullable: true })
  Property_Area: number;

  // Связь с UserEntity (многие данные к одному пользователю)
  @OneToOne(() => UserEntity)
  @JoinColumn() // Обязательно, чтобы указать сторону владения
  user: UserEntity;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddData {
  @ApiProperty({ example: 1 })
  @IsNumber()
  Gender: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  Married: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  Dependents: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  Education: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  Self_Employed: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  ApplicantIncome: number;

  @ApiProperty({ example: 400 })
  @IsNumber()
  CoapplicantIncome: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  LoanAmount: number;

  @ApiProperty({ example: 360 })
  @IsNumber()
  Loan_Amount_Term: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  Credit_History: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  Property_Area: number;
}

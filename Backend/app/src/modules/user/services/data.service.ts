import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { DataEntity } from '../entities/data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import axios from 'axios';
import { AddData } from '../dto/add-data.dto';

@Injectable()
export class DataService extends BaseService<DataEntity> {
  constructor(
    @InjectRepository(DataEntity)
    private readonly dataRepository: Repository<DataEntity>,
    private readonly userService: UserService,
  ) {
    super(dataRepository);
  }

  async getUserPrediction(userId: number, body: AddData): Promise<any> {
    // Получение данных пользователя
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const userData = new DataEntity();
    Object.assign(userData, body);
    if (user.data) {
      user.data = userData;
      await this.userService.saveUser(user);
    }
    const payload = {
      Gender: userData.Gender,
      Married: userData.Married,
      Dependents: userData.Dependents,
      Education: userData.Education,
      Self_Employed: userData.Self_Employed,
      ApplicantIncome: userData.ApplicantIncome,
      CoapplicantIncome: userData.CoapplicantIncome,
      LoanAmount: userData.LoanAmount,
      Loan_Amount_Term: userData.Loan_Amount_Term,
      Credit_History: userData.Credit_History,
      Property_Area: userData.Property_Area,
    };

    // Отправка данных на Python-сервер
    try {
      const response = await axios.post(
        'http://localhost:8000/predict',
        payload,
      );
      return response.data; // Возвращаем предсказание от Python-сервера
    } catch (error) {
      throw new Error(`Error contacting prediction server: ${error.message}`);
    }
  }
}

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';
// import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    if (!name || !email) {
      throw new AppError('incorrect name or email', 400);
    }
    const findByEmail = await this.customersRepository.findByEmail(email);

    if (findByEmail) {
      throw new AppError('E-mail already registered', 400);
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });
    return customer;
  }
}

export default CreateCustomerService;

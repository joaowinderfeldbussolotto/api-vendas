import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(page = 1, perPage = 10): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const [customers, total] = await customersRepository
      .createQueryBuilder('customer')
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(total / perPage);

    return {
      from: (page - 1) * perPage + 1,
      to: Math.min(page * perPage, total),
      per_page: perPage,
      total: total,
      current_page: page,
      prev_page: page > 1 ? page - 1 : null,
      next_page: page < totalPages ? page + 1 : null,
      data: customers,
    };
  }
}

export default ListCustomerService;

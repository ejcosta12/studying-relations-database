import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    if (!products || !customer_id) {
      throw new AppError('products or customer_id not found');
    }
    const findProductsId = products.map(({ id }) => ({ id }));
    const productsIds = await this.productsRepository.findAllById(
      findProductsId,
    );
    if (!(productsIds.length === products.length)) {
      throw new AppError('product error');
    }
    const customer = await this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('customer_id error');
    }
    const productsData = await this.productsRepository.updateQuantity(products);

    const productsRequest = productsData.map((product, index) => ({
      product_id: product.id,
      price: product.price,
      quantity: products[index].quantity,
    }));

    if (!customer || !productsData) {
      throw new AppError('Customer or products error.');
    }
    const order = await this.ordersRepository.create({
      customer,
      products: productsRequest,
    });

    return order;
  }
}

export default CreateOrderService;

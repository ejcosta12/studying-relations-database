import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showOrder = container.resolve(FindOrderService);
    const { id } = request.params;
    const order = await showOrder.execute({
      id,
    });
    return response.json({
      customer: order?.customer,
      order_products: order?.orders_products,
      order,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);
    const { customer_id, products } = request.body;
    const order = await createOrder.execute({
      customer_id,
      products,
    });
    return response.json({
      customer: order?.customer,
      order_products: order?.orders_products,
    });
  }
}

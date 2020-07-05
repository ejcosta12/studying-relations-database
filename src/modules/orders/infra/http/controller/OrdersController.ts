import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = container.resolve(FindOrderService);
    const order = await showOrder.execute({
      id,
    });
    return response.json({
      customer: {
        email: order?.customer.email,
        id: order?.customer.id,
        name: order?.customer.name,
      },
      order_products: order?.orders_products.map(product => ({
        price: product.price,
        product_id: product.product_id,
        quantity: product.quantity,
      })),
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
      id: order.id,
      customer: {
        email: order.customer.email,
        id: order.customer.id,
        name: order.customer.name,
      },
      order_products: order.orders_products.map(product => ({
        price: product.price,
        product_id: product.product_id,
        quantity: product.quantity,
      })),
    });
  }
}

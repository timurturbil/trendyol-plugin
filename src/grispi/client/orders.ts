import { Order, OrderResponse } from "@/types/trendyol.type";
import { HttpHandler } from "./http-handler";
import { orders as constantOrders } from "@/lib/constants";
export class Orders {
    constructor(
        private http: HttpHandler
    ) {}

    async getOrder<Order>(supplierId: number, orderNumber: number): Promise<Order | null | undefined> {
        const response = await this.http.send<OrderResponse>(
            `suppliers/${supplierId}/orders?orderNumber=${orderNumber}`,
            {
                method: "GET",
                cache: "no-cache"
            }
        );

        if (response) {
            const order: Order = response.content[0] as Order;
            return order
        }
    }

    async getOrders<Order>(supplierId: number, size: number): Promise<Order[] | null | undefined> {
        // const response = await this.http.send<OrderResponse>(
        //     `suppliers/${supplierId}/orders?size=${size}`,
        //     {
        //         method: "GET",
        //         cache: "no-cache"
        //     }
        // );

        // if (response) {
        //     const orders: Order[] = response.content as Order[];
        //     return orders
        // }
        return constantOrders as Order[];
    }

    async getCustomers<Customer>(supplierId: number, size: number): Promise<Customer[] | null | undefined> {
        const orders = await this.getOrders<Order>(supplierId, size);

        if (orders) {
            const customers: Customer[] = [
                {
                    customerFirstName: orders[0].customerFirstName,
                    customerLastName: orders[0].customerLastName,
                    customerEmail: orders[0].customerEmail,
                    customerId: orders[0].customerId,
                    orders: []
                } as Customer
            ] as Customer[];

            for (const order of orders) {
                let customer = customers.find(c => (c as any).customerId === order.customerId);
                if (customer) {
                    (customer as any).orders.push(order);
                }else{
                    customers.push({
                        customerFirstName: order.customerFirstName,
                        customerLastName: order.customerLastName,
                        customerEmail: order.customerEmail,
                        customerId: order.customerId,
                        orders: [order]
                    } as Customer);
                }
            }

            return customers;
        }
    }
}
import { Customer, Order } from "@/types/trendyol.type";
import { RootStore } from "./root-store";
import { makeAutoObservable } from "mobx";

export class TrendyolStore {
  rootStore: RootStore;
  customer?: Customer;
  customers?: Customer[];
  order?: Order;
  orders?: Order[];
  showAllOrders?: boolean;
  showAllDetails?: boolean;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;

  }

  updateCustomer(customer: Customer) {
    this.customer = customer;
  }

  updateCustomers(customers: Customer[]) {
    this.customers = customers;
  }

  updateOrder(order: Order) {
    this.order = order;
  }

  updateOrders(orders: Order[]) {
    this.orders = orders;
  }

  updateShowAllOrders(showAllOrders: boolean) {
    this.showAllOrders = showAllOrders;
  }

  updateShowAllDetails(showAllDetails: boolean) {
    this.showAllDetails = showAllDetails;
  }
}

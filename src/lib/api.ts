import { HttpRequestHelper } from "./http-request-helper";
import { Orders } from "../services/orders";

export class TrendyolAPI {
    private httpRequestHelper: HttpRequestHelper;
    readonly orders: Orders;

    constructor() {
        this.httpRequestHelper = new HttpRequestHelper();
        this.orders = new Orders(this.httpRequestHelper);
    }
}

export const trendyolAPI = new TrendyolAPI();

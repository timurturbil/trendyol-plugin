import { Authentication } from "./authentication";
import { HttpHandler } from "./http-handler";
import { Tickets } from "./tickets";

export class GrispiAPI {
  private httpHandler: HttpHandler;
  readonly authentication: Authentication;
  readonly tickets: Tickets;

  constructor() {
    this.httpHandler = new HttpHandler();
    this.authentication = new Authentication(this.httpHandler);
    this.tickets = new Tickets(this.httpHandler, this.authentication);
  }
}

export const grispiAPI = new GrispiAPI();

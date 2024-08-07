import { HttpHandler } from "./http-handler";

export class Authentication {
  public headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  constructor(private http: HttpHandler) {}

  setTenantId(tenantId: string) {
    this.headers["tenantId"] = tenantId;
    this.http.setHeaders({ tenantId, ...this.headers });
  }

  setToken(token: string) {
    this.headers["Authorization"] = `Bearer ${token}`;
    this.http.setHeaders({ Authorization: `Bearer ${token}`, ...this.headers });
  }

  setTrendyolToken(token: string) {
    this.headers["Trendyol-Authorization"] = `Basic ${token}`;
    this.http.setHeaders({ "Trendyol-Authorization": `Basic ${token}`, ...this.headers });
  }

  setHeaders(headers: Record<string, string>) {
    this.headers = { ...this.headers, ...headers };
    this.http.setHeaders(headers);
  }
}

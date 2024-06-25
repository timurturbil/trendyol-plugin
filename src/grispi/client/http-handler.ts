export class HttpHandler {
  baseUrl: string = "https://api.grispi.net";
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  async send<T>(url: string, options: RequestInit): Promise<T | null> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });

    if (response.ok) {
      return await response.json();
    }

    return null;
  }
}

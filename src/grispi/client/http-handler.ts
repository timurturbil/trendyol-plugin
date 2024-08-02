import { baseUrl } from "@/lib/constants";

export class HttpHandler {
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  async send<T>(url: string, options: RequestInit): Promise<T | null> {
    const response = await fetch(`${baseUrl}/${url}`, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });

    if (response.ok) {
      return await response.json();
    }

    return null;
  }
}

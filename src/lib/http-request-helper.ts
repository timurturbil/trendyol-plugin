import { baseUrl, contentType, grispiAuthorization, tenantId, trendyolAuthorization } from "./constants";

export class HttpRequestHelper {
    headers: Record<string, string> = {
        "Content-Type": contentType,
        "Trendyol-Authorization": trendyolAuthorization,
        "Authorization": grispiAuthorization,
        "tenantId": tenantId
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
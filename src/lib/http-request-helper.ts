export class HttpRequestHelper {
    proxyUrl: string = "https://api.grispi.com/trendyol?url=";
    //proxyUrl: string = "http://localhost:8080/";
    baseUrl: string = this.proxyUrl + "https://stageapi.trendyol.com/stagesapigw";
    //baseUrl: string = "https://stageapi.trendyol.com/stagesapigw";
    username: string = "TBQs8BCgqwvJWHe6AqmW";
    password: string = "KrEGffp2OroT1F5iYNXC";
    headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
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

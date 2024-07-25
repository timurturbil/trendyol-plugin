export class HttpRequestHelper {
    //proxyUrl: string = "https://custom-proxy-server-production.up.railway.app/";
    //proxyUrl: string = "http://localhost:8080/";
    //baseUrl: string = this.proxyUrl + "https://stageapi.trendyol.com/stagesapigw";
    baseUrl: string = "https://stageapi.trendyol.com/stagesapigw";
    username: string = "3xATCK5OkR6p8LBohvse";
    password: string = "QqfFXiUat1x82D4vdSbS";
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

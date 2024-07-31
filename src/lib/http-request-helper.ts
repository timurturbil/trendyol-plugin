export class HttpRequestHelper {
    proxyUrl: string = "https://api.grispi.com/trendyol?url=";
    //proxyUrl: string = "http://localhost:8080/";
    baseUrl: string = this.proxyUrl + "https://api.trendyol.com/sapigw";
    //baseUrl: string = "https://api.trendyol.com/sapigw";
    username: string = "A8ahxcWDsmoay2OJJtrN";
    password: string = "PjqJAsoEPYRJ0g5hh9rs";
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

//https://stageapi.trendyol.com/stagesapigw
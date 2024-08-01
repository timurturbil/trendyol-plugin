export class HttpRequestHelper {
    proxyUrl: string = "https://api.grispi.com/trendyol?url=";
    //proxyUrl: string = "http://localhost:8080/";
    baseUrl: string = this.proxyUrl + "https://api.trendyol.com/sapigw";
    //baseUrl: string = "https://api.trendyol.com/sapigw";
    //username: string = "997502";
    //password: string = "A8ahxcWDsmoay2OJJtrN";
    //trendyolAuthorizationString: string = `Basic ${btoa(`${this.username}:${this.password}`)}`;
    headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWRlbGVyIiwic3ViIjoiYWJvbmVAZG9ydWtkZXN0YW4uY29tIiwieGlkIjoxLCJkZXYiOmZhbHNlLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlzcyI6ImdyaXNwaS1hcGk6MjA0MzY4MTMzMiIsImV4cCI6MTcyMjUxNDcyMCwiaWF0IjoxNzIyNTExMTIwLCJqdGkiOiIwNWMzMjc3NS1lNDEzLTQzNWQtODRjYy00NGM2YTE3ZjIzMGYifQ.BfD2F-geUV5b1XLmr-jOW9_VWgII4ZUoF1bvSeUtu7M",
        "Trendyol-Authorization": "Basic QThhaHhjV0RzbW9heTJPSkp0ck46UGpxSkFzb0VQWVJKMGc1aGg5cnM=",
        "tenantId": "dedeler"
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
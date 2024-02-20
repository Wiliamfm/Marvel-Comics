import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  private readonly baseUrl = "https://gateway.marvel.com:443/v1/public";
  private readonly apiKey = "";

  constructor(private readonly _httpClient: HttpClient) { }

  private createUrl(url: string): string {
    return `${this.baseUrl}${url}?apikey=${this.apiKey}`;
  }

  public getCharacters() {
    return this._httpClient.get<any[]>(this.createUrl('/characters'));
  }
}

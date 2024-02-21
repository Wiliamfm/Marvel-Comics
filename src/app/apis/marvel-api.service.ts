import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetCharacters } from '../models/characters';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  private readonly baseUrl = "https://gateway.marvel.com:443/v1/public";
  private readonly apiKey = environment.MARVEL_P_KEY;

  constructor(private readonly _httpClient: HttpClient) { }

  private createUrl(url: string): string {
    return `${this.baseUrl}${url}?apikey=${this.apiKey}`;
  }

  public getCharacters(limit: number, offSet: number): Observable<GetCharacters> {
    return this._httpClient.get<GetCharacters>(this.createUrl('/characters'), {
      params: {
        limit,
        offset: offSet
      }
    });
  }
}

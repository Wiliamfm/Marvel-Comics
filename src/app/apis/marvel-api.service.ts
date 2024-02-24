import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CharactersRequest, GetCharacters } from '../models/characters';
import { Observable } from 'rxjs';
import { GetComic } from '../models/comics';

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

  private filterObject(obj: {}): {} {
    return Object.fromEntries(Object.entries(obj).
      filter(([key, val]) => val != null));
  }

  public getCharacters(input: CharactersRequest): Observable<GetCharacters> {
    return this._httpClient.get<GetCharacters>(this.createUrl('/characters'), {
      params: this.filterObject(input)
    });
  }

  public getComic(id: number): Observable<GetComic> {
    return this._httpClient.get<GetComic>(this.createUrl(`/comics/${id}`))
  }
}

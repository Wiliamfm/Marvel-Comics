import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CharactersRequest, GetCharacter, GetCharacters } from '../models/characters';
import { Observable } from 'rxjs';
import { GetComic } from '../models/comics';
import { GetEvent, GetSerie, GetStory } from '../models/marvel';

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
      filter(([, val]) => val != null));
  }

  public getCharacters(input: CharactersRequest): Observable<GetCharacters> {
    return this._httpClient.get<GetCharacters>(this.createUrl('/characters'), {
      params: this.filterObject(input)
    });
  }

  public getCharacter(id: number): Observable<GetCharacter> {
    return this._httpClient.get<GetCharacter>(this.createUrl(`/characters/${id}`));
  }

  public getComic(id: number): Observable<GetComic> {
    return this._httpClient.get<GetComic>(this.createUrl(`/comics/${id}`))
  }

  public getSerie(id: number): Observable<GetSerie> {
    return this._httpClient.get<GetSerie>(this.createUrl(`/series/${id}`))
  }

  public getStory(id: number): Observable<GetStory> {
    return this._httpClient.get<GetStory>(this.createUrl(`/stories/${id}`))
  }

  public getEvent(id: number): Observable<GetEvent> {
    return this._httpClient.get<GetEvent>(this.createUrl(`/events/${id}`))
  }
}

import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';
import { Observable } from 'rxjs';
import { Characters, CharactersRequest, GetCharacters } from '../models/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private readonly marvelService: MarvelApiService) { }

  public getCharacters(params: CharactersRequest): Observable<Characters> {
    return new Observable(subscriber => {
      this.marvelService.getCharacters(params).subscribe({
        next: (response: GetCharacters) => {
          console.log(response);
          const characters: Characters = {
            total: response.data.total,
            characters: response.data.results
          }
          subscriber.next(characters);
        },
        error: error => console.error("Unable to get characters:\n", error)
      })
    });
  }
}

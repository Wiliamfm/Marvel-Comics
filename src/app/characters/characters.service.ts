import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';
import { Observable } from 'rxjs';
import { Character, Characters, CharactersRequest, GetCharacters } from '../models/characters';
import { PORTRAIT_FANTASTIC_168X252PX } from './const/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private readonly marvelService: MarvelApiService) { }

  public getCharacters(params: CharactersRequest): Observable<Characters> {
    return new Observable(subscriber => {
      this.marvelService.getCharacters(params).subscribe({
        next: (response: GetCharacters) => {
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

  public getCharacter(id: number): Observable<Character>{
    return new Observable(subscriber => {
      this.marvelService.getCharacter(id).subscribe({
        next: (response) => {
          if(response.data.results.length <= 0) {
            subscriber.error(`Character: ${id} not found!`);
          }else{
            subscriber.next(response.data.results[0]);
          }
        },
        error: error => console.error("Unable to get character:\n", error)
      })
    })
  }

  createImgUrl(item: Character, imgSize = PORTRAIT_FANTASTIC_168X252PX) {
    return `${item.thumbnail.path}/${imgSize}.${item.thumbnail.extension}`
  }
}

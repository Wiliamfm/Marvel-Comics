import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private readonly marvelService: MarvelApiService) { }

  public getCharacters() {
    return this.marvelService.getCharacters();
  }
}

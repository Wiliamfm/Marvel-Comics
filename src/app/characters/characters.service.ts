import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private readonly marvelService: MarvelApiService) { }

  public getCharacters(limit: number, offSet: number) {
    return this.marvelService.getCharacters(limit, offSet);
  }
}

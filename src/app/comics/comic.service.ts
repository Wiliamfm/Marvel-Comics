import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';
import { Comic, GetComic } from '../models/comics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  readonly favoriteComics: Comic[]= [];

  constructor(private readonly marvelService: MarvelApiService) { }

  public getComic(id: number): Observable<Comic> {
    return new Observable(subscriber => {
      this.marvelService.getComic(id).subscribe({
        next: (response: GetComic) => {
          if (response.data.results.length <= 0) {
            subscriber.error(`Comic: ${id} not found!`);
          }
          subscriber.next(response.data.results[0]);
        },
        error: error => console.error("Unable to get characters:\n", error)
      })
    });
  }

  checkComicInFavorites(comic: Comic): boolean {
    for(const favoriteComic of this.favoriteComics) {
      if(favoriteComic.id === comic.id) {
        return true;
      }
    }
    return false;
  }

  addFavorite(comic: Comic): boolean {
    if(this.checkComicInFavorites(comic)) {
      return false;
    }
    this.favoriteComics.push(comic);
    console.log(this.favoriteComics);
    return true;
  }

  removeFavorite(comic: Comic): boolean {
    const comicIndex = this.favoriteComics.indexOf(comic);
    if(comicIndex < 0) {
      return false;
    }
    this.favoriteComics.splice(comicIndex, 1);
    console.log(this.favoriteComics);
    return true;
  }
}

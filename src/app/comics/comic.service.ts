import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';
import { Comic, GetComic } from '../models/comics';
import { Observable } from 'rxjs';
import { PORTRAIT_FANTASTIC_168X252PX } from '../characters/const/character';

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

  createImgUrl(item: Comic, imgSize = PORTRAIT_FANTASTIC_168X252PX) {
    return `${item.thumbnail.path}/${imgSize}.${item.thumbnail.extension}`
  }

  checkComicInFavorites(comic: Comic): boolean {
    for(const favoriteComic of this.favoriteComics) {
      if(favoriteComic.id === comic.id) {
        return true;
      }
    }
    return false;
  }

  getComicFromFavorites(comicId: number): Comic | null {
    for(const favoriteComic of this.favoriteComics) {
      if(favoriteComic.id === comicId) {
        return favoriteComic;
      }
    }
    return null;
  }

  getComicIndexFromFavorites(comicId: number): number {
    for(let i = 0; i < this.favoriteComics.length; i++) {
      if(this.favoriteComics[i].id === comicId) {
        return i;
      }
    }
    return -1;
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
    const comicIndex = this.getComicIndexFromFavorites(comic.id);
    if(comicIndex === -1) {
      return false;
    }
    this.favoriteComics.splice(comicIndex, 1);
    console.log(this.favoriteComics);
    return true;
  }
}

import { Injectable } from '@angular/core';
import { MarvelApiService } from '../apis/marvel-api.service';
import { Comic, GetComic } from '../models/comics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

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
}

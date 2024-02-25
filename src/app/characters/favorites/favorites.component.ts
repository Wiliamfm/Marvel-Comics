import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/comics/comic.service';
import { Comic } from 'src/app/models/comics';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  favorites: Comic[]= [];

  constructor(private readonly _comicService: ComicService){

  }

  ngOnInit(): void {
    this.favorites = this._comicService.favoriteComics;
  }

  createImgUrl(item: Comic, imgSize?: string) {
    return this._comicService.createImgUrl(item, imgSize);
  }

  removeComic(comic: Comic) {
    this._comicService.removeFavorite(comic);
    //this.favorites = this._comicService.favoriteComics;
  }

}

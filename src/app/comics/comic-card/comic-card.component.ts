import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PORTRAIT_FANTASTIC_168X252PX } from 'src/app/characters/const/character';
import { Character } from 'src/app/models/characters';
import { Comic } from 'src/app/models/comics';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrl: './comic-card.component.scss'
})
export class ComicCardComponent implements OnChanges {
  @Input() comic: Comic | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<boolean>();

  constructor(private readonly _comicService: ComicService) {
    console.log(this.comic);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['comic']){
      //this.comic = changes['comic'].currentValue;
    }
  }

  createImgUrl(item: Character | Comic, imgSize = PORTRAIT_FANTASTIC_168X252PX) {
    return `${item.thumbnail.path}/${imgSize}.${item.thumbnail.extension}`
  }

  closeModal(){
    this.close.emit(true);
  }

  addToFavorites(comic: Comic){
    return this._comicService.addFavorite(comic);
  }

  removeFromFavorites(comic: Comic){
    return this._comicService.removeFavorite(comic);
  }

  isFavorite(comic: Comic): boolean {
    return this._comicService.checkComicInFavorites(comic);
  }

}

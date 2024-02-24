import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/characters';
import { environment } from 'src/environments/environment';
import { PORTRAIT_FANTASTIC_168X252PX } from '../const/character';
import { Comic } from 'src/app/models/comics';
import { ComicService } from 'src/app/comics/comic.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character: Character | null = null;
  apiKey = environment.MARVEL_P_KEY;
  currentComic: Comic | null = null;

  constructor(private readonly _comicService: ComicService) {

  }

  setComicUrl(baseUrl: string): string {
    return `${baseUrl}?apiKey=${this.apiKey}`
  }

  createImgUrl(character: Character, imgSize = PORTRAIT_FANTASTIC_168X252PX) {
    return `${character.thumbnail.path}/${imgSize}.${character.thumbnail.extension}`
  }

  setCurrentComic(comicUrl: string) {
    const comicId = Number(comicUrl.split("/").pop());
    if (typeof comicId !== "number") {
      //TODO Display some warning?
      this.currentComic = null;
      return;
    }
    this._comicService.getComic(comicId).subscribe({
      next: comic => {
        this.currentComic = comic;
        console.log("Comic:\n", this.currentComic);
      },
      error: error => console.error("unable to get comic:\n", error)
    })
  }

}

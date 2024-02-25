import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Character } from 'src/app/models/characters';
import { LANDSCAPE_INCREDIBLE_464X261PX, PORTRAIT_FANTASTIC_168X252PX } from '../const/character';
import { Comic } from 'src/app/models/comics';
import { ComicService } from 'src/app/comics/comic.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit{
  @Input({transform: numberAttribute}) id: number | null = null;
  character: Character | null = null;
  comics: Comic[] = [];
  isComicModalOpen= false;
  currentComic: Comic | null = null;

  constructor(private readonly _charactersService: CharactersService, private readonly _comicService: ComicService) { }

  ngOnInit(): void {
    if(this.id === null || Number.isNaN(this.id)) {
      return;
    }
    this._charactersService.getCharacter(this.id).subscribe({
      next: (character) => {
        this.character= character;
        for(const comic of character.comics.items) {
          this._comicService.getComic(this.getComicIdFromUrl(comic.resourceURI)).subscribe({
            next: (comic) => this.comics.push(comic),
            error: error => console.error("Unable to get comic:\n", error)
          })
        }
      },
      error: error => console.error("Unable to get character:\n", error)
    })
  }

  createImgUrl(item: Character, imgSize= LANDSCAPE_INCREDIBLE_464X261PX ) {
    return this._charactersService.createImgUrl(item, imgSize);
  }

  createComicImgUrl(item: Comic, imgSize= PORTRAIT_FANTASTIC_168X252PX ) {
    return this._comicService.createImgUrl(item, imgSize);
  }

  private getComicIdFromUrl(url: string): number {
    return Number(url.split("/").pop());
  }

  openComicModal(comic: Comic) {
    this.currentComic = comic;
    this.isComicModalOpen = true;
  }

  closeComicModal(){
    this.isComicModalOpen = false
  }

}

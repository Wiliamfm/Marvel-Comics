import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/characters';
import { LANDSCAPE_INCREDIBLE_464X261PX, LANDSCAPE_SMALL_120X90PX } from '../const/character';
import { Comic } from 'src/app/models/comics';
import { ComicService } from 'src/app/comics/comic.service';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/app/shared/loader/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character | null = null;
  apiKey = environment.MARVEL_P_KEY;
  currentComic: Comic | null = null;
  isComicModalOpen = false;

  constructor(private readonly _comicService: ComicService, private readonly _spinnerService: SpinnerService, private readonly _router: Router) {

  }

  ngOnInit(): void {
    const [comicModal]= this.getElementsByIds(["comicModal"]);
    if(comicModal){
      comicModal.addEventListener("shown.bs.modal", () => {
        this.currentComic = null;
      })
    }

  }

  createImgUrl(item: Character | Comic, imgSize = LANDSCAPE_INCREDIBLE_464X261PX) {
    return `${item.thumbnail.path}/${imgSize}.${item.thumbnail.extension}`
  }

  setCurrentComic(comicUrl: string) {
    this._spinnerService.open();
    const comicId = Number(comicUrl.split("/").pop());
    if (typeof comicId !== "number") {
      //TODO Display some warning?
      this.currentComic = null;
      return;
    }
    this._comicService.getComic(comicId).subscribe({
      next: comic => {
        this.currentComic = JSON.parse(JSON.stringify(comic)) as Comic;
        this._spinnerService.close();
        this.openComicModal();
      },
      error: error => console.error("unable to get comic:\n", error)
    })
  }

  private openComicModal(){
    this.isComicModalOpen = true;
  }

  closeComicModal(){
    this.isComicModalOpen = false;
  }

  private getElementsByIds(ids: string[]){
    return ids.map(id => document.getElementById(id));
  }

  goToDetails(character: Character){
    this._router.navigate(['characters', character.id]);
  }
}

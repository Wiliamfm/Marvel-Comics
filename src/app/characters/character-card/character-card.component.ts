import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/characters';
import { environment } from 'src/environments/environment';
import { PORTRAIT_FANTASTIC_168X252PX } from '../const/character';
import { Comic } from 'src/app/models/comics';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character: Character | null = null;
  apiKey = environment.MARVEL_P_KEY;

  setComicUrl(baseUrl: string): string {
    return `${baseUrl}?apiKey=${this.apiKey}`
  }

  createImgUrl(character: Character, imgSize = PORTRAIT_FANTASTIC_168X252PX) {
    return `${character.thumbnail.path}/${imgSize}.${character.thumbnail.extension}`
  }

  openComicModal() {
    console.log("open comic");
  }

}

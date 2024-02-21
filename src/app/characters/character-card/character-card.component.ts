import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/characters';
import { environment } from 'src/environments/environment';

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

}

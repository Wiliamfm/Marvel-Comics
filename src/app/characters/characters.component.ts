import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { Character, Characters } from '../models/characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  readonly pageLimit = 10;
  pageOffSet = 0;
  totalCharacters = 0;
  currentPage = 0;
  characters: Character[] = [];

  constructor(private readonly charactersService: CharactersService) {

  }

  ngOnInit(): void {
    this.setCharacters(this.pageLimit, this.pageOffSet)
  }

  private setCharacters(pageLimit: number, pageOffSet: number): void {
    this.charactersService.getCharacters(pageLimit, pageOffSet).subscribe({
      next: (response: Characters) => {
        this.characters = response.characters;
        this.totalCharacters = response.total;
      },
      error: error => {
        console.error("Unable to get characters:\n", error);
      }
    });
  }

  goToPage(goToNext = true) {
    console.log(this.pageOffSet, this.totalCharacters)
    if (goToNext) {
      if (this.pageOffSet + this.pageLimit < this.totalCharacters) {
        this.pageOffSet += this.pageLimit;
        this.currentPage++;
      }
    } else {
      this.currentPage--;
      this.pageOffSet -= this.pageLimit;
      if (this.pageOffSet <= 1) {
        this.pageOffSet = 0;
        this.currentPage = 0;
      }
    }
    this.setCharacters(this.pageLimit, this.pageOffSet);
  }
}

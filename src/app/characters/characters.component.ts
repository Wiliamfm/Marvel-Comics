import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  pageLimit = 10;
  pageOffSet = 0;
  characters = [];

  constructor(private readonly charactersService: CharactersService) {

  }

  ngOnInit(): void {
    this.charactersService.getCharacters(this.pageLimit, this.pageOffSet).subscribe({
      next: response => {
        //this.characters = response.data.results;
        console.log(response);
      },
      error: error => {
        console.error("Unable to get characters:\n", error);
      }
    });
  }
}

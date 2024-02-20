import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {

  constructor(private readonly charactersService: CharactersService) {

  }

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error("Unable to get characters:\n", error);
      }
    });
  }
}

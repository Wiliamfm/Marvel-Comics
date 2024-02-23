import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { Character, Characters, CharactersRequest } from '../models/characters';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  totalCharacters = 0;
  currentPage = 0;
  characters: Character[] = [];
  filterForm: FormGroup;
  filterParams: CharactersRequest = {
    limit: 10,
    offset: 0,
  };

  constructor(private readonly charactersService: CharactersService, private readonly _fb: FormBuilder) {
    this.filterForm = this._fb.group({
      name: [],
    })
  }

  ngOnInit(): void {
    this.setCharacters(this.filterParams)
    this.filterForm.controls['name'].valueChanges.subscribe(value => {
      this.filterParams.nameStartsWith = value;
      this.setCharacters(this.filterParams);
      this.filterParams.nameStartsWith = undefined;
    });
  }

  private setCharacters(params: CharactersRequest): void {
    this.charactersService.getCharacters(params).subscribe({
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
    console.log(this.filterParams, this.totalCharacters);
    if (this.filterParams.offset == null || this.filterParams.limit == null) {
      console.error("limit or offset not defined");
      return;
    }
    if (goToNext) {
      if (this.filterParams.offset + this.filterParams.limit < this.totalCharacters) {
        this.filterParams.offset += this.filterParams.limit;
        this.currentPage++;
      }
    } else {
      this.currentPage--;
      this.filterParams.offset -= this.filterParams.limit;
      if (this.filterParams.offset <= 1) {
        this.filterParams.offset = 0;
        this.currentPage = 0;
      }
    }
    this.setCharacters(this.filterParams);
  }
}

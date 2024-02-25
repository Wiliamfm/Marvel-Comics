import { Component, Input, OnInit, TemplateRef, inject, numberAttribute } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Character } from 'src/app/models/characters';
import { LANDSCAPE_INCREDIBLE_464X261PX, PORTRAIT_FANTASTIC_168X252PX } from '../const/character';
import { Comic } from 'src/app/models/comics';
import { ComicService } from 'src/app/comics/comic.service';
import { PlatformsStreamingService } from 'src/app/apis/platforms-streaming.service';
import { MarvelApiService } from 'src/app/apis/marvel-api.service';
import { GetSerie, Serie, Story } from 'src/app/models/marvel';
import { Observable, concat, filter, finalize } from 'rxjs';
import { Title, TitleResponse, TitleSource } from 'src/app/models/watchMovie';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit{
  @Input({transform: numberAttribute}) id: number | null = null;

  private modalService = inject(NgbModal);

  character: Character | null = null;
  comics: Comic[] = [];
  isComicModalOpen= false;
  currentComic: Comic | null = null;
  series: Serie[] = [];
  series$: Observable<GetSerie>[] = [];
  stories: Story[] = [];
  stories$: Observable<Story>[] = [];
  titles: Title[] = [];
  currentTitle: Title | null = null;


  constructor(private readonly _charactersService: CharactersService, private readonly _comicService: ComicService, private readonly _streamingPlatformsService: PlatformsStreamingService, private readonly _marvelService: MarvelApiService) { }

  ngOnInit(): void {
    if(this.id === null || Number.isNaN(this.id)) {
      return;
    }
    this._charactersService.getCharacter(this.id).subscribe({
      next: (character) => {
        console.log(character);
        this.character= character;
        if(this.character === null) {
          return;
        }
        this._streamingPlatformsService.autocompleteSearchItem(this.character?.name).subscribe({
          next: response => {
            this.titles = response.results;
            for(let title of this.titles){
              this.setTitleSources(title);
            }
          },
          error: error => console.error(`Unable to get streaming platforms for serie ${this.character!.name}:\n`, error)
        })
        for(const comic of character.comics.items) {
          this._comicService.getComic(this.getComicIdFromUrl(comic.resourceURI)).subscribe({
            next: (comic) => this.comics.push(comic),
            error: error => console.error("Unable to get comic:\n", error)
          })
        }
        for(const serie of character.series.items) {
          this.series$.push(this._marvelService.getSerie(this.getComicIdFromUrl(serie.resourceURI)));
        }
        concat(...this.series$).pipe(filter(response => {
          return response.data.results.length > 0
        })).subscribe({
          next: response => this.series.push(response.data.results[0]),
          error: error => console.error("Unable to get serie:\n", error)
        })
      },
      error: error => console.error("Unable to get character:\n", error)
    });
  }

  setTitleSources(title: Title) {
    this._streamingPlatformsService.getTitleSources(title.id).subscribe({
      next: sources => {
        this.addSourcesToTitle(title, sources);
      },
      error: error => console.error("Unable to get title sources:\n", error)
    })
  }

  addSourcesToTitle(title: Title, sources: TitleSource[]) {
    if(!title.sources) {
      title.sources = [];
    }
    for(const source of sources) {
      if(this.getTitleSource(title, source.source_id)) {
        continue;
      }
      title.sources.push(source);
    }
  }

  getTitleSource(title: Title, sourceId: number) {
    if(!title.sources){
      return null;
    }
    for(const source of title.sources){
      if(source.source_id === sourceId) {
        return source;
      }
    }
    return null;
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

  openTitleModal(content: TemplateRef<any>, title: Title) {
    this.currentTitle = title;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log(`Closed with: ${result}`);
			},
			(reason) => {
				console.log(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
  }

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

}

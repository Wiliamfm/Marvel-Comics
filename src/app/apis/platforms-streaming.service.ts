import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SearchResponse, StreamingPlatform, TitleResponse, TitleSource } from '../models/watchMovie';

@Injectable({
  providedIn: 'root'
})
export class PlatformsStreamingService {
  private readonly baseUrl = "https://api.watchmode.com/v1";
  private readonly apiKey = environment.WATCHMOVIE_P_KEY;
  streamingPlatforms: StreamingPlatform[] = [];
  private readonly regions = ["CO"];

  constructor(private readonly _httpClient: HttpClient) {
    this.getStreamingPlatforms().subscribe({
      next: response => {
        this.streamingPlatforms = response;
      },
      error: error => console.error("Unable to get streaming platforms:\n", error)
    });
  }

  private createUrl(url: string): string {
    return `${this.baseUrl}${url}?apiKey=${this.apiKey}`;
  }

  private filterObject(obj: {}): {} {
    return Object.fromEntries(Object.entries(obj).
      filter(([, val]) => val != null));
  }

  public getStreamingPlatforms(region = this.regions): Observable<StreamingPlatform[]> {
    return this._httpClient.get<StreamingPlatform[]>(this.createUrl("/sources/"), {
      params: {
        regions: region.join(",")
      }
    });
  }

  public autocompleteSearchItem(term: string, search_type=2): Observable<TitleResponse> {
    return this._httpClient.get<TitleResponse>(this.createUrl("/autocomplete-search/"), {
      params: {
        search_value: term,
        search_type: search_type
      }
    });
  }

  public searchItem(term: string, search_field="name", types="tv,movie"): Observable<SearchResponse> {
    return this._httpClient.get<SearchResponse>(this.createUrl("/search/"), {
      params: {
        search_value: term,
        search_field: search_field,
        types: types,
      }
    });
  }

  public getTitleSources(id: number): Observable<TitleSource[]> {
    return this._httpClient.get<TitleSource[]>(this.createUrl(`/title/${id}/sources`))
  }
}

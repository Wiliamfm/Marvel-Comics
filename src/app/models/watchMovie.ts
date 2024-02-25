export interface StreamingPlatform {
  id: number,
  name: string,
  type: string,
  logo_100px: string,
  ios_appstore_url: string,
  android_playstore_url: string
}

export interface SearchResponse {
  title_results: [],
  people_results: [],
  tv_results: [],
}

export interface TitleResponse {
  results: Title[]
}

export interface Title {
  id: number;
  image_url: string;
  name: string;
  year: number;
  result_type: string;
  sources?: TitleSource[];
  isOpen?: boolean;
}

export interface TitleSource {
  source_id: number,
  name: string,
  type: string,
  ios_url: string | null,
  android_url: string | null,
  web_url: string | null,
  format: string,
  price: number,
  seasons: number,
  episodes: number
}

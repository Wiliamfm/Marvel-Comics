export interface GetEvent {
  code: number,
  status: string,
  copyright: string,
  attributionText: string,
  attributionHTML: string,
  data: {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Event[]
  },
  etag: string
}

export interface Event {
  id: number,
  title: string,
  description: string,
  resourceURI: string,
  urls: [
    {
      type: string,
      url: string
    }
  ],
  modified: Date,
  start: Date,
  end: Date,
  thumbnail: {
    path: string,
    extension: string
  },
  comics: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  stories: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        type: string
      }
    ]
  },
  series: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  characters: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  creators: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  next: {
    resourceURI: string,
    name: string
  },
  previous: {
    resourceURI: string,
    name: string
  }
}

export interface GetSerie {
  code: number,
  status: string,
  copyright: string,
  attributionText: string,
  attributionHTML: string,
  data: {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Serie[]
  },
  etag: string
}

export interface Serie{
  id: number,
  title: string,
  description: string,
  resourceURI: string,
  urls: [
    {
      type: string,
      url: string
    }
  ],
  startYear: number,
  endYear: number,
  rating: string,
  modified: Date,
  thumbnail: {
    path: string,
    extension: string
  },
  comics: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  stories: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        type: string
      }
    ]
  },
  events: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  characters: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  creators: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  next: {
    resourceURI: string,
    name: string
  },
  previous: {
    resourceURI: string,
    name: string
  }
}

export interface GetStory{
  code: number,
  status: string,
  copyright: string,
  attributionText: string,
  attributionHTML: string,
  data: Story[],
  etag: string
}

export interface Story{
  id: number,
  title: string,
  description: string,
  resourceURI: string,
  type: string,
  modified: Date,
  thumbnail: {
    path: string,
    extension: string
  },
  comics: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  series: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  events: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  characters: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  creators: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  originalissue: {
    resourceURI: string,
    name: string
  }
}

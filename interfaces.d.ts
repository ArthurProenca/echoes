declare global {
  interface Cover {
    name: string;
    key: string;
    size: number;
    lastModified: string;
    eTag: string;
    publicUrl: string;
  }

  interface Track {
    name: string;
    key: string;
    size: number;
    lastModified: string;
    eTag: string;
    publicUrl: string;
    type: string;
  }

  interface Gif {
    publicUrl : string;
  }

  interface Album {
    name: string;
    cover: Cover;
    tracks: Track[];
    gif: Gif;
  }

  interface Artist {
    name: string;
    albums: Album[];
  }

  interface Theme {
    name: string;
    key: string;
    size: number;
    lastModified: string;
    eTag: string;
    publicUrl: string;
  }

  interface MusicLibrary {
    artists: Artist[];
    themes: Theme[];
  }
}

export default global;

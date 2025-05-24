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
    publicUrl: string;
  }

  interface Lyric {
    publicUrl: string;
  }

  interface Album {
    name: string;
    cover: Cover;
    tracks: Track[];
    gif: Gif;
    lyrics: Lyric;
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

  interface Song {
    coverUrl: string;
    demoUrl: string;
    instrumentalUrl: string;
    vocalUrl: string;
    gifUrl: string;
    artistName: string;
    albumName: string;
    lyricsUrl;
  }

  interface EchoeAnalyse {
    pitch_similarity: string;
    timbre_mfcc_similarity: string;
    dynamics_rms_similarity: string;
    timing_onset_similarity: string;
    timbre_centroid_similarity: string;
    timbre_contrast_similarity: string;
  }
}

export default global;

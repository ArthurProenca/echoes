export default class SongsClient {
    private readonly url: string;
  
    constructor() {
      const envUrl = process.env.SONGS_LAMBDA_URL; 
  
      if (!envUrl) {
        throw new Error("Missing SONGS_LAMBDA_URL env var");
      }
      this.url = envUrl;
    }
  
    async getAllSongs(): Promise<MusicLibrary> {
      const res = await fetch(this.url);
      const data = await res.json();
      return data as MusicLibrary;
    }
    
  }
  
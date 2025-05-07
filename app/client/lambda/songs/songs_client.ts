export default class SongsClient {
    private readonly url: string;
  
    constructor() {
      const envUrl = "https://iigru2vbc4vrf72zlxwhev7a440heftw.lambda-url.us-east-2.on.aws/"; 
  
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
  
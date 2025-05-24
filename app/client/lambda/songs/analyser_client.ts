export default class AnalyserClient {
  private readonly url: string;

  constructor() {
    const envUrl =
      "https://echoes-analyser-production.up.railway.app/sound/analyser";

    if (!envUrl) {
      throw new Error("Missing SONGS_LAMBDA_URL env var");
    }
    this.url = envUrl;
  }

  async soundAnalyse(audio: Blob, vocalUrl: string): Promise<EchoeAnalyse> {
    try {
      const formData = new FormData();
      formData.append("audio_file", audio);
      formData.append("link", vocalUrl);
      const res = await fetch(this.url, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Failed to analyze sound: ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return {
        dynamics_rms_similarity: "",
        pitch_similarity: "",
        timbre_centroid_similarity: "",
        timbre_contrast_similarity: "",
        timbre_mfcc_similarity: "",
        timing_onset_similarity: "",
        media: ""
      };
    }
  }
}

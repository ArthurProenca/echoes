export type SongCoverType = Readonly<{
  id: number;
  isCenter: boolean;
  publicUrl: string;
  name: string;
  artist: string;
  onClick?: () => void;
}>;

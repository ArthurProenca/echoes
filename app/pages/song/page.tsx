export interface SongPageProps {
  readonly cover: string;
  readonly name: string;
  readonly artist: string;
}

export default function SongPage(props: SongPageProps) {
    const i = props.cover;
    return (
        <main className="min-h-screen flex flex-col items-center justify-start relative">
                    {i}
        </main>
    )
}

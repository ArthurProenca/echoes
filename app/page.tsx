"use client";
import { useRouter } from "next/navigation";
import SingButton from "./components/sing_button";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="max-h-screen flex flex-row items-center justify-center relative overflow-hidden p-14">
      <section className="w-full h-full">
        <div className="flex flex-row items-center justify-between w-full">
          <span>Karaokê</span>
          <div className="flex flex-col items-center">
            <h1 className="text-[150px] font-jersey -mb-10">ECHOES</h1>
            <article onClick={() => router.push("/pages/songs")}>
              <SingButton title="Bora?" />
            </article>
            <div className="flex flex-col items-center">
              <Image width={40} height={40} alt="" src="/main_page_icon.svg" />
              <span>
                Solte a voz, <br /> deixe ecoar.
              </span>
            </div>
          </div>
          <span>100% carregado</span>
        </div>
      </section>
    </main>
  );
}

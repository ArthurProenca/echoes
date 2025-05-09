'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackscreenButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="flex flex-row items-center w-full gap-5 opacity-45"
    >
      <Image width={17} height={33} alt="" src="/back_arrow.svg" unoptimized />
      <span className="text-5xl font-jersey uppercase">VOLTAR</span>
    </button>
  );
}

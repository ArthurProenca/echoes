import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
      <Image
        width={40}
        height={40}
        alt=""
        src="/main_page_icon.svg"
        className="animate-spin"
      />
    </div>
  );
}

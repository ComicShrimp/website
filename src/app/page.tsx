import Image from "next/image"

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-1">
      <div className="flex flex-col items-center justify-center">
        <Image
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/43503750"
          width={250}
          height={250}
          alt="Profile picture"
        />
        <h1 className="text-6xl font-bold">Mário Victor</h1>
        <p className="text-center text-2xl">Software Developer</p>
      </div>
    </main>
  )
}

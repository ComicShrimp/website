import { ProfilePicture } from "@/components/ProfilePicture"
import githubIcon from "../assets/github-icon.svg"
import linkedinIcon from "../assets/linkedin-icon.svg"
import mediumIcon from "../assets/medium-icon.svg"
import Image from "next/image"

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-1">
      <div className="flex flex-col items-center justify-center">
        <div className="p-10">
          <ProfilePicture width={250} height={250} />
        </div>
        <h1 className="text-6xl font-bold">Mário Victor</h1>
        <p className="text-center text-2xl">Software Developer</p>
      </div>
      <div className="">
        <Image src={githubIcon} alt="Github Logo"/>
        <Image src={linkedinIcon} alt="Linkedin Logo"/>
        <Image src={mediumIcon} alt="Medium Logo"/>
      </div>
    </main>
  )
}

import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialIcons } from '@/components/SocialIcons'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-1">
      <div className="flex flex-col items-center justify-center">
        <div className="p-5">
          <ProfilePicture width={250} height={250} />
        </div>
        <h1 className="text-6xl font-bold">Mário Victor</h1>
        <p className="mb-5 text-center text-2xl">Software Developer</p>
        <SocialIcons iconHeight={35} iconWidth={35} />
      </div>
    </main>
  )
}

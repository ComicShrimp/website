import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialIcons } from '@/components/SocialIcons'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-5">
        <ProfilePicture className="rounded-full" width={250} height={250} />
        <div className="border-l-2 pl-4">
          <h1 className="text-6xl font-bold">Mário Victor</h1>
          <p className="mb-2 text-2xl">Software Developer</p>
          <SocialIcons iconHeight={35} iconWidth={35} />
        </div>
      </div>
    </main>
  )
}

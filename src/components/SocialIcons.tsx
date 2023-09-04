import Image from 'next/image'
import githubIcon from '../assets/github-icon.svg'
import linkedinIcon from '../assets/linkedin-icon.svg'
import mediumIcon from '../assets/medium-icon.svg'

type Props = {
  iconWidth?: number
  iconHeight?: number
}

export function SocialIcons({ iconWidth = 50, iconHeight = 50 }: Props) {
  return (
    <div className="flex items-center justify-center space-x-8">
      <Image
        src={githubIcon}
        width={iconWidth}
        height={iconHeight}
        alt="Github Logo"
      />
      <Image
        src={linkedinIcon}
        width={iconWidth}
        height={iconHeight}
        alt="Linkedin Logo"
      />
      <Image
        src={mediumIcon}
        width={iconWidth}
        height={iconHeight}
        alt="Medium Logo"
      />
    </div>
  )
}

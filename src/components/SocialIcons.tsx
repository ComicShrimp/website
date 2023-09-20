import Image from 'next/image'
import githubIcon from '../assets/github-icon.svg'
import linkedinIcon from '../assets/linkedin-icon.svg'
import mediumIcon from '../assets/medium-icon.svg'
import Link from 'next/link'

type Props = {
  iconWidth?: number
  iconHeight?: number
}

export function SocialIcons({ iconWidth = 50, iconHeight = 50 }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <Link href="https://github.com/ComicShrimp" target="_blank">
        <Image
          src={githubIcon}
          width={iconWidth}
          height={iconHeight}
          alt="Github Logo"
        />
      </Link>
      <Link href="https://www.linkedin.com/in/mariovictorrs" target="_blank">
        <Image
          src={linkedinIcon}
          width={iconWidth}
          height={iconHeight}
          alt="Linkedin Logo"
        />
      </Link>
      <Link href="https://medium.com/@mariovictorrs" target="_blank">
        <Image
          src={mediumIcon}
          width={iconWidth}
          height={iconHeight}
          alt="Medium Logo"
        />
      </Link>
    </div>
  )
}

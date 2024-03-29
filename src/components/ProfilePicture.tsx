import Image from 'next/image'

export function ProfilePicture(props: {
  width: number
  height: number
  className?: string
}) {
  return (
    <Image
      className={props.className}
      src="https://avatars.githubusercontent.com/u/43503750"
      width={props.width}
      height={props.height}
      alt="Profile picture"
    />
  )
}

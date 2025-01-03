'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useSelector } from "react-redux";
import { selectUser, selectSpaces } from "@/redux/selectors";

function AvatarCustom() {
  const user = useSelector(selectUser)
  const spaces = useSelector(selectSpaces)

  if (!user) {
    return (
      <Avatar className="">
        <AvatarFallback>Loading...</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Avatar className="">
      <AvatarImage 
        src={user.image || 'https://avatars.githubusercontent.com/u/50006980?v=4'} 
        alt={`${user.name}'s avatar`}  
        className="rounded-full w-[48px] h-[48px] md:w-[64px] md:h-[64px]"
      />
    </Avatar>
  )
}

export default AvatarCustom
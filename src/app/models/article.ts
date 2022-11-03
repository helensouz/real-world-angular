import { DatePipe } from "@angular/common";
import { Date } from "mongoose";
import { NewUser } from "./newUser";
import { User } from "./user"

export interface Article{
    
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[];
      createdAt: DatePipe,
      updatedAt: string,
      favorited: true,
      favoritesCount: 0,
      author: NewUser,
        username: string,
        bio: string,
        image: string,
        following: boolean
     
}
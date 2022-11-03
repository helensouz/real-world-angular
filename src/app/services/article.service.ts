import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Article } from '../models/article';
import { NewArticle } from '../models/newArticle';
import { TokenInterceptor } from '../token.interceptor';

type State = {
  isLoading: boolean;
  articleRequestStatus: 'error' | 'success' | 'nao enviado';
}

type CreateArticle = {
  title: string,
  description: string,
  body: string,
}

let _state: State = {
  isLoading: false,
  articleRequestStatus: 'nao enviado'
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  constructor(private httpClient: HttpClient, private tokenInterceptor: TokenInterceptor) { }
  private readonly API_URL = 'https://api.realworld.io/api';


  //  headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization':  this.sessionStorage.getItem('token') });

  // options = { headers: headers };

  

  public getAllArticles(): Observable<Article[]> {
      return this.httpClient.get<Article[]>(`${this.API_URL}/articles`).pipe(
        map(
          (data: any) => data.articles
        )
      )
  }



  public putArticle( article : {title: any, description: any, body: any}   ){
    this.httpClient.post(`${this.API_URL}/articles`, { article: article}   )   
    .subscribe((res) => {
      console.log(res)
    })
     
        
   }


  public getAllTags(): Observable<{tags: string}[]> {
    return this.httpClient.get<{tags: string}[]>(`${this.API_URL}/tags`).pipe(
      map(
        (data: any) => data.tags
      )
    )
  }


  

 



}

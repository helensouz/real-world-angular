import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of, Subject } from 'rxjs';
export type state =   'error' | 'success'  | 'loading'
export type payload =  {email: string; password: string}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = 'https://api.realworld.io/api';
  constructor(private httpClient: HttpClient) { }

  //action stream/produces

  private loginSubmittedSubject = new Subject<payload>();

  loginSubmitted$ = this.loginSubmittedSubject.asObservable();

  
  loginSubmittedResponse$: Observable<state> = this.loginSubmitted$.pipe(
    mergeMap((payload) => 
    this.httpClient
    .post(`${this.API_URL}/users/login`, {user: payload})
    .pipe(
      map(() => 'success' as state),
      catchError(() => of('error' as state))
    )
    
    )
  );

  dispatch(payload: payload): void{
    this.loginSubmittedSubject.next(payload);
  }
  //async
  
  
}



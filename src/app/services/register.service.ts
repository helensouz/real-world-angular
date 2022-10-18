import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NewUser } from "../models/newUser";
import { catchError, map, mergeMap, Observable, of, Subject } from "rxjs";
export type payload =  {email: string; password: string; username: string}
export type state =   'error' | 'success'  | 'loading'

@Injectable({
    providedIn: 'root',
})

export class RegisterService{  
    constructor(private httpClient: HttpClient) {}
    private readonly API_URL = 'https://api.realworld.io/api';


    private registerSubmittedSubject = new Subject<payload>();

    registerSubmitted$ = this.registerSubmittedSubject.asObservable();
   

    registerSubmittedResponse$: Observable<state> = this.registerSubmitted$.pipe(
        mergeMap((payload) => 
        this.httpClient
        .post(`${this.API_URL}/users`, {user: payload})
        .pipe( 
            map(() => 'success' as state),
            catchError(() => of('error' as state))
        )
    ) 
    );

    dispatch(payload: payload): void{
        this.registerSubmittedSubject.next(payload);
    }


    
}

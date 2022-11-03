import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, Subject } from 'rxjs';

 
type State = {
    isLoading:  boolean;
    loginRequestStatus: 'error' | 'success' | 'nao enviado'
}  

let _state: State = {
  isLoading: false, 
  loginRequestStatus: 'nao enviado'

}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = 'https://api.realworld.io/api';
  constructor(private httpClient: HttpClient, private router: Router) { }


    private store = new BehaviorSubject<State>(_state);
    public state$ = this.store.asObservable()


  
  //ao disparar a action, chamamos o reducer
  loginSubmit(email: string, password: string): void{
    const newState =  this.reducer(
        {type: 'login request', payload: {email, password} },
      _state
        );
        this.store.next(newState) //reducer guarda o estado na store

        
  }
  //async
  
  private reducer(
    action: {type: string; payload?: {email: string, password: string}}, 
    currentState: State
    ): State{
    switch (action.type) {
      case 'login request': {
        this.sideEffect(action.payload!.email, action.payload!.password);
        const newState = {...currentState, isLoading: true}
        return newState as State
      }
       case 'login sucesso': {
        const newState = {
          ...currentState,  
          isLoading: false,
           loginRequestStatus: 'success'
           
       }
       return newState as State
       
      }
      case 'login error': {
        const newState = {
          ...currentState,  
          isLoading: false,
           loginRequestStatus: 'error'
       }
       return newState as State
      }
      default:
        return currentState
  
  }
}




   private sideEffect(email: string, password: string): void{
     this.httpClient.post(`${this.API_URL}/users/login`, {
      user: {email, password},
    }).subscribe({
      next: (res: any) => 
      {
        const newState =  this.reducer({type: 'login sucesso'}, _state);
       this.store.next(newState)
       sessionStorage.setItem('jwtToken', res.token) 
       console.log('login sucesso')
       this.router.navigate(['homeLogado'])
    },
       error: ()=> 
       {
        const newState =  this.reducer({type: 'login erro'}, _state);
        console.log('login err0')

      this.store.next(newState)
     
    }
    })
   }


 
  
 }

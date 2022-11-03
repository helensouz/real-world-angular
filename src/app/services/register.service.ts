import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, Subject } from "rxjs";
import { Router } from "@angular/router";
 
type State = {
    isLoadingRegister: boolean;
    registerRequestStatus: 'error' | 'success' | 'nao enviado'
}

type UserCadastro ={
    username: string,
    email: string,
    password: string

}

let _state: State = {
    isLoadingRegister: false,
    registerRequestStatus: 'nao enviado'
}

@Injectable({
    providedIn: 'root',
})

export class RegisterService{  
    constructor(private httpClient: HttpClient, private router: Router) {}
    private readonly API_URL = 'https://api.realworld.io/api';



    private store = new BehaviorSubject<State>(_state)
    public state$ = this.store.asObservable()


    registerSubmit(email: string, password: string, username: string): void{
        const newState = this.reducer(
            {type: 'register request', payload: {email, password, username}},
            _state
        );
        this.store.next(newState)
    }

    private reducer(
        action: {type: string; payload?: {email: string, password: string, username: string}},
        currentState: State
    ): State{
        switch(action.type){
            case 'register request': {
                this.sideEffect( action.payload!.email, action.payload!.password, action.payload!.username);
                const newState = {...currentState, isLoadingRegister: true}
                return newState as State
            }
            case 'register success': {
                const newState = {
                    ...currentState,
                    isLoadingRegister: false,
                    registerRequestStatus: 'success' 
                }
                return newState as State
                
            
        }
         case 'register error': {
            const newState = {
                ...currentState,
                isLoadingRegister: false,
                registerRequestStatus: 'error' 
            }
            return newState as State
        }
            default: {
                return currentState
            }
                
        }
    
    }

   

   private sideEffect(email: string, password: string, username: string){

    this.httpClient.post(`${this.API_URL}/users`, {
        user: {email, password, username}
    }).subscribe({
        next: () => {
            const newState = this.reducer({type: 'register success'}, _state)
             this.store.next(newState)
             console.log('deu sucesso', newState)

            },
        error: () => {
            const newState =  this.reducer({type: 'register error'}, _state)
             this.store.next(newState)
             console.log('deu error', newState)
            }

    })
   }


    
}

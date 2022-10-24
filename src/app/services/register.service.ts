import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NewUser } from "../models/newUser";
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, Subject } from "rxjs";
import { Router } from "express";
 
type State ={
    isLoadingRegister: boolean;
    registerRequestStatus: 'error' | 'success' | 'nao enviado'
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


    registerSubmit(email: string, password: string): void{
        const newState = this.reducer(
            {type: 'register request', payload: {email, password}},
            _state
        );
        this.store.next(newState)
    }

    private reducer(
        action: {type: string; payload?: {email: string, password: string}},
        currentState: State
    ): State{
        switch(action.type){
            case 'register request': {
                this.sideEffect(action.payload!.email, action.payload!.password);
                const newState = {...currentState, isLoadingRegister: true}
                return newState as State
            }
            case 'register sucesso': {
                const newState = {
                    ...currentState,
                    isLoadingRegister: false,
                    registerRequestStatus: 'success' 
                }
                return newState as State
                
            
        }
         case 'login error': {
            const newState = {
                ...currentState,
                isLoadingRegister: false,
                registerRequestStatus: 'error' 
            }
            return newState as State
        }
            default:
                return currentState
        }
    
    }

   

   private sideEffect(email: string, password: string){
    this.httpClient.post(`${this.API_URL}/users/login`, {
        user: {email, password}
    }).subscribe({
        next: () => {const newState = this.reducer({type: 'register success'}, _state)
        this.store.next(newState)},
        error: () => {const newState =  this.reducer({type: 'register error'}, _state)
        this.store.next(newState)}

    })
   }


    
}

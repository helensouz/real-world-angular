import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLogadoComponent } from "./home-logado/home-logado.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [

    {path:'', redirectTo: 'home', pathMatch:'full'}, //quando a uri estiver vazia, sera acessado
    {path:'home', component: HomeComponent},
    {path:'register', component: RegisterComponent}, //
    {path:'login', component: LoginComponent}, 
    {path: 'homeLogado', component: HomeLogadoComponent}

  
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
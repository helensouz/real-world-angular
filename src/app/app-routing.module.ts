import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticleComponent } from "./article/article.component";
import { HomeLogadoComponent } from "./home-logado/home-logado.component";
import { HomeComponent } from "./home/home.component";
import { LoggedGuardGuard } from "./logged-guard.guard";
import { LoginComponent } from "./login/login.component";
import { PageErrorComponent } from "./page-error/page-error.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [

    {path:'', redirectTo: 'homeLogado', pathMatch:'full'}, //quando a uri estiver vazia, sera acessado
    {path:'home', component: HomeComponent},
    {path:'register', component: RegisterComponent}, //
    {path:'login', component: LoginComponent}, 
    {path: 'homeLogado', component: HomeLogadoComponent, canActivate: [LoggedGuardGuard]},
    {path: 'article', component: ArticleComponent},
    {path: 'page-error', component: PageErrorComponent}

  
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
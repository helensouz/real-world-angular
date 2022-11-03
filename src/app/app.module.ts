import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeLogadoComponent } from './home-logado/home-logado.component';
import { ArticleComponent } from './article/article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import { CommaExpr } from '@angular/compiler';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { TokenInterceptor } from './token.interceptor';
import { PageErrorComponent } from './page-error/page-error.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    HomeLogadoComponent,
    ArticleComponent,
    PageErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule


  
 


    
    
    // HomeModule

    ],
    exports: [LoginComponent, RegisterComponent, NavigationComponent],

  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,  multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';



@Component({
  selector: 'app-home-logado',
  templateUrl: './home-logado.component.html',
  styleUrls: ['./home-logado.component.css']
})
export class HomeLogadoComponent implements OnInit {

  articles$: Observable<Article[]>
  tags$: Observable<{tags: string}[]>


  constructor(private articleService: ArticleService) { 
    this.articles$ = this.articleService.getAllArticles()
    this.tags$ = this.articleService.getAllTags()

  }


  ngOnInit(): void {
    this.articles$.subscribe(console.log)
    this.tags$.subscribe(console.log)
  }

}

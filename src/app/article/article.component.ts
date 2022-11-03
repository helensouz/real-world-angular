import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

export interface Tags {
  name: string;
}
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  constructor(private articleService: ArticleService) { }



  formGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    body: new FormControl('', [
      Validators.required
    ])
  })

  OnSubmit() {
   
    const { title, description, body} = this.formGroup.value;

    this.articleService.putArticle({title, description, body})
    


}


 

  ngOnInit(): void {




  }

}

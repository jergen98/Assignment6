import { Component, OnInit } from '@angular/core';
import { ApiServices } from './services/api.service';

import { Comements } from './classes/comments';
import { Post } from './classes/posts';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { map } from 'rxjs/operators';
import { Todos } from './model/todos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allTodos: Todos[] = [];
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    this.fetchProducts();
  }
  onProductsFetch(){
    this.fetchProducts();
  }

  add(products : {description: string, summary: string}){
    console.log(products);
    this.http.post<{name: string}>("/echo/todos", products)
    .subscribe((res)=>{
        console.log(res);
    });

  }
  private fetchProducts() {
    this.http.get<{[key: string]: Todos}>("/echo/todos")
    .pipe(map((res) =>{
      const todos = []
      for (const key in res){  
        if (res.hasOwnProperty(key)){ 
          todos.push({...res[key], id: key})
        }
      }
      return todos;
    }))
    .subscribe((todos) =>{
      console.log(todos);
      this.allTodos = todos;
    })
  }

  onDeleteTodo(id: string){
    this.http.delete("/echo/todos/"+ id)
    .subscribe(); 
  }

}

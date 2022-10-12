import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Post } from "../classes/posts";

@Injectable()
export class ApiServices
{
    constructor (private httpclient: HttpClient){}

    getcomments(): Observable<any>{
        return this.httpclient.get("localhost:8080/todos");
    }


    post2(opost: Post) : Observable<any>{
        return this.httpclient.post("localhost:8080/todos", opost);
    }

}
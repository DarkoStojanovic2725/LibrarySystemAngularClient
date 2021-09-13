import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from "@angular/common/http"
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = "https://localhost:44384/api/Books"
  readonly authorsUrl = "https://localhost:44384/api/Authors"

  formData: Book = new Book();

  postBook(){
    return this.http.post(this.baseUrl + '/Insert', this.formData);
  }

  getAuthors(){
    return this.http.get<Author[]>(this.authorsUrl);
  }
}

import { Injectable } from '@angular/core';
import { NewBook } from '../models/newbook.model';
import { HttpClient } from "@angular/common/http"
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { AddNewBookResponse } from '../components/shared/responses/addnewbook.response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  readonly booksUrl = "https://localhost:44384/api/Books"
  readonly authorsUrl = "https://localhost:44384/api/Authors"

  formData: NewBook = new NewBook();

  postBook(bookModel: NewBook){
    bookModel.Genre = Number(bookModel.Genre);
    return this.http.post<AddNewBookResponse>(this.booksUrl + '/Insert', bookModel);
  }

  updateBook(bookModel: NewBook){
    bookModel.Genre = Number(bookModel.Genre);
    return this.http.put<AddNewBookResponse>(this.booksUrl + '/Update', bookModel);
  }

  getAuthors(){
    return this.http.get<Author[]>(this.authorsUrl);
  }

  getBooks(){
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(id: number) {
    return this.http.get<NewBook>(this.booksUrl + '/GetById?id=' + id);
  }

  deleteBook(id: number){
    return this.http.delete(this.booksUrl + '/DeleteById?id=' + id);
  }
}

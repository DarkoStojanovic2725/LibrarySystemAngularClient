import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { NgForm } from '@angular/forms';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor(public service: BookService) {
    this.getAuthors();
  }

  Authors: Author[]

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.service.postBook().subscribe(
      res => {

      },
      err => { console.log(err); }
    );
  }

  getAuthors(){
    this.service.getAuthors().subscribe(
      data => this.Authors = data
    );
  }
}

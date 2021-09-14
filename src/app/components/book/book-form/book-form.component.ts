import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { Genre } from '../../shared/Enums/Genre.Enum';
import { NewBook } from 'src/app/models/newbook.model';
import { AddNewBookResponse } from '../../shared/responses/addnewbook.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  
  constructor(private service: BookService, private router: Router) {
  }

  Authors: Author[];
  genres = Genre;

  bookModel: NewBook = new NewBook();

  genreEnumKeys: any [];

  ngOnInit(): void {
    this.getAuthors();
    this.populateGenreEnumKeys();
  }

  onSubmit(){
    this.service.postBook(this.bookModel).subscribe(
      (res: AddNewBookResponse) => {
        console.log(res);
        if(res.successful){
          this.router.navigate(['/books']);
        }
      },
      err => { console.log(err); }
    );
  }

  getAuthors(){
    this.service.getAuthors().subscribe(
      data => this.Authors = data
    );
  }

  private populateGenreEnumKeys(){
    this.genreEnumKeys = Object.keys(this.genres).filter(Number);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Genre } from '../shared/Enums/Genre.Enum';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
  ]
})
export class BookComponent implements OnInit {

  constructor(private service: BookService, private router: Router) { }

  displayedColumns: string[] = ['id', 'title', 'description', 'genre', 'author', 'modifiedUtcDateTime', 'options'];
  data: Book[] = [];

  ngOnInit(): void {
    this.service.getBooks().subscribe(
      res => {
        this.data = res as Book[];
        console.log("Books", this.data)
      },
      err => console.log(err)
    )
  }

  getEnumValue(EnumValue: number){
    return Genre[EnumValue];
  }

  deleteBook(id: number) {
    this.service.deleteBook(id).subscribe(res => 
        {
          this.reloadCurrentRoute();
        }, 
        err => {
          console.log(err);
        }
      );
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}

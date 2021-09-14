import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Author } from "src/app/models/author.model";
import { NewBook } from "src/app/models/newbook.model";
import { BookService } from "src/app/services/book.service";
import { Genre } from "../../shared/Enums/Genre.Enum";

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: []
  })

  export class EditBookComponent implements OnInit {
    genre: number;

    genreEnumKeys: any [];
    genres = Genre;
    authors: any[];
    selectedGenre: number;

    newBook: NewBook = new NewBook();

    constructor(private service: BookService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.getAuthors();
        this.populateGenreEnumKeys();
        this.getBook(this.route.snapshot.params['id']);
    }

    onSubmit(){
        console.log(this.newBook);
        this.service.updateBook(this.newBook).subscribe(response => {
            console.log(response.successful);
            if(response.successful){
                this.router.navigate(['/books']);
            }
        });
    }

    getAuthors(){
        this.service.getAuthors().subscribe(response => {
            this.mapAuthor(response);
        });
    }

    getBook(id: number) {
        this.service.getBookById(id).subscribe(resp => {
            this.mapNewBook(resp);
        });
    }

      private populateGenreEnumKeys(){
        this.genreEnumKeys = Object.keys(this.genres).filter(element => !isNaN(Number(element)));
      }

      public mapAuthor(data: any){
          this.authors = data.map((x: any) => this.populateNewAuthor(x));
          console.log('authors', this.authors);
      }

    populateNewAuthor(data: any) {
        let author = new Author;
        author.id = data['id'];
        author.firstName = data['firstName'];
        author.lastName = data['lastName'];
        return author;
    }

      public mapNewBook(data: any){
          this.newBook = this.mapNewBookData(data);
      }

      public mapNewBookData(data: any){
          let result = new NewBook();
          result.Id = data['id'];
          result.Title = data['title'];
          result.Description = data['description'];
          result.Genre = data['genre'];
          result.AuthorId = data['authorId'];
          return result;
      }

      onGenreChange(value: number) {
        this.newBook.Genre = value;
      }
  }
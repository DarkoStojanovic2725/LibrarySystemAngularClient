import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import { Genre } from "../../shared/Enums/Genre.Enum";

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: []
  })

  export class EditBookComponent implements OnInit{
    
    bookForm: FormGroup;
    title: string;
    id: string;
    description: string;
    genre: number;

    genreEnumKeys: any [];
    genres = Genre;
    
    constructor(private service: BookService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.populateGenreEnumKeys();
        //this.id = this.route.snapshot.params['id'];
        this.bookForm = this.formBuilder.group({
            id : this.route.snapshot.params['id'],
            title : ['', Validators.required],
            description : ['', Validators.required],
            genre : ['', Validators.required]
          });

          this.getBook(this.route.snapshot.params['id']);
    }

    onSubmit(){

    }

    getBook(id: number) {
        this.service.getBookById(id).subscribe(x => this.bookForm.patchValue(x));
        console.log(this.bookForm);
      }

      private populateGenreEnumKeys(){
        this.genreEnumKeys = Object.keys(this.genres).filter(Number);
      }
  }
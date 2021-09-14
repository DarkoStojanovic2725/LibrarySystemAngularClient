import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './components/book/book-form/book-form.component';
import { BookComponent } from './components/book/book.component';
import { EditBookComponent } from './components/book/edit-book/edit-book.component';

const routes: Routes = [
  { path: 'add-book', component: BookFormComponent, data: {title: 'AddBook'}},
  { path: 'books', component: BookComponent, data: {title: 'Books'}},
  { path: 'edit-book/:id', component: EditBookComponent, data: {title: 'Edit book'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

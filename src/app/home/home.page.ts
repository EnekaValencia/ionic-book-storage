import { Component, OnInit } from '@angular/core';
/*
import { IBook } from '../share/interfaces';
import { BookdbService } from '../core/bookdbservice.service';
import { DetailsPage } from '../details/details.page';
*/
import { Router } from '@angular/router';
import { BookcrudService } from './../core/bookcrud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  books: any;
  bookId: String;
  bookName: String;
  bookGenre: String;
  bookDate: String;
  bookCover: String;
  bookDescription: String;
  bookAuthor: String;
  bookEditorial: String;
  bookPrice: Number;

  constructor(private bookcrudService: BookcrudService, private route: Router) { }

  ngOnInit(): void {
    this.bookcrudService.read_Books().subscribe(data => {
      this.books = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          idBook: e.payload.doc.data()['id'],
          name: e.payload.doc.data()['name'],
          genre: e.payload.doc.data()['genre'],
          date: e.payload.doc.data()['date'],
          cover: e.payload.doc.data()['cover'],
          description: e.payload.doc.data()['description'],
          author: e.payload.doc.data()['author'],
          editorial: e.payload.doc.data()['editorial'],
          price: e.payload.doc.data()['price']
        };
      })
      console.log(this.books);
    });
  }

  CreateRecord() {
    let record = {};
    record['id'] = this.bookId
    record['name'] = this.bookName;
    record['genre'] = this.bookGenre;
    record['date'] = this.bookDate;
    record['cover'] = this.bookCover;
    record['description'] = this.bookDescription;
    record['author'] = this.bookAuthor;
    record['editorial'] = this.bookEditorial;
    record['price'] = this.bookPrice;
    this.bookcrudService.create_Book(record).then(resp => {
      this.bookId = "";
      this.bookName = "";
      this.bookGenre = "";
      this.bookDate = "";
      this.bookCover = "";
      this.bookDescription = "";
      this.bookAuthor = "";
      this.bookEditorial = "";
      this.bookPrice = 0;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.bookcrudService.delete_Book(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditId = record.Id;
    record.EditName = record.Name;
    record.EditGenre = record.Genre;
    record.EditDate = record.Date;
    record.EditCover = record.Cover;
    record.EditDescription = record.Description;
    record.EditAuthor = record.Author;
    record.EditEditorial = record.Editorial;
    record.EditPrice = record.Price;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['id'] = recordRow.EditId;
    record['name'] = recordRow.EditName;
    record['genre'] = recordRow.EditGenre;
    record['date'] = recordRow.EditDate;
    record['cover'] = recordRow.EditCover;
    record['descrition'] = recordRow.EditDescription;
    record['author'] = recordRow.EditAuthor;
    record['editorial'] = recordRow.EditEditorial;
    record['price'] = recordRow.EditPrice;
    this.bookcrudService.update_Book(recordRow.id, record);
    recordRow.isEdit = false;
  }

  bookTapped(book) {
    this.route.navigate(['details', book.id]);
  }
}

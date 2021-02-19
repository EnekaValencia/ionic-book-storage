import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { BookdbService } from '../core/bookdbservice.service';
import { IBook } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { BookcrudService } from '../core/bookcrud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {

  id: string;
  book: IBook;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private bookcrudService: BookcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.bookcrudService.read_Books().subscribe(data => {
      let books = data.map(e => {
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
      books.forEach(element => {
        if (element.id == this.id) {
          this.book = element;
        }
      });

      console.log(this.book);
    });
  }

editRecord(book) {
  this.router.navigate(['edit', book.id])
}

async removeRecord(id) {
  const toast = await this.toastController.create({
    header: 'Elimiar Libro',
    position: 'top',
    buttons: [
      {
        side: 'start',
        icon: 'delete',
        text: 'ACEPTAR',
        handler: () => {
          this.bookcrudService.delete_Book(id);
          this.router.navigate(['home']);
        }
      }, {
        text: 'CANCELAR',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  toast.present();
}
}

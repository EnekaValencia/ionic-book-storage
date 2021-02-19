import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { BookdbService } from '../core/bookdbservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IBook } from '../share/interfaces';
import { ReactiveFormsModule } from '@angular/forms';
import { BookcrudService } from '../core/bookcrud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  book: IBook;
  bookForm: FormGroup;
  id: String;

  constructor(  
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private bookcrudService: BookcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() { 
    this.bookForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
      author: new FormControl(''),
      editorial: new FormControl(''),
      price: new FormControl(''),
    });
    
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
        if(element.id == this.id){
          this.book=element;
          this.bookForm.get('name').setValue(this.book.name),
          this.bookForm.get('genre').setValue(this.book.genre),
          this.bookForm.get('date').setValue(this.book.date),
          this.bookForm.get('cover').setValue(this.book.cover),
          this.bookForm.get('description').setValue(this.book.description),
          this.bookForm.get('author').setValue(this.book.author),
          this.bookForm.get('editorial').setValue(this.book.editorial),
          this.bookForm.get('price').setValue(this.book.price) 
        }
      });
      console.log(this.book);
    });

  }

  async onEdit() {
    const toast = await this.toastController.create({
      header: 'Editar libro',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.editBook();
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

  editBook() {
    this.bookcrudService.update_Book(this.book.id, this.book);
    console.warn(this.bookForm.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BookdbService } from '../core/bookdbservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IBook } from '../share/interfaces';
import { ReactiveFormsModule } from '@angular/forms';

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
    private bookdbService: BookdbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.bookdbService.getItem(this.id).then(
      (data: IBook) => this.book = data
    ); 
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
    this.bookdbService.setItem(this.book.id, this.book);
    console.warn(this.bookForm.value);
  }

}

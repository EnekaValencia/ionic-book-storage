import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BookdbService } from '../core/bookdbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IBook } from '../share/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {
  book: IBook;
  bookForm: FormGroup;

  constructor(
    private router: Router,
    private bookdbService: BookdbService,
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
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar libro',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveBook();
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

  saveBook() {
    this.book = this.bookForm.value;
    let nextKey = this.book.name.trim();
    this.book.id = nextKey;
    this.bookdbService.setItem(nextKey, this.book);
    console.warn(this.bookForm.value);
  }
}

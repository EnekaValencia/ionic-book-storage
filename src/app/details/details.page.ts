import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookdbService } from '../core/bookdbservice.service';
import { IBook } from '../share/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  id: string;
  public book: IBook;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private bookdbService: BookdbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.bookdbService.getItem(this.id)
      .then((data: IBook) => this.book = data);
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
            this.bookdbService.remove(id);
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

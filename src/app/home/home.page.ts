import { Component, OnInit } from '@angular/core';
import { IBook } from '../share/interfaces';
import { BookdbService } from '../core/bookdbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})

export class HomePage implements OnInit {

  public books: IBook[];
  booksinit: IBook[] = [
    {
      id: '1',
      name: 'Rebelión en la granja',
      genre: 'Novela Satírica, fábula',
      date: '17/08/1945',
      cover: 'https://images-na.ssl-images-amazon.com/images/I/51LiCiTIC3L.jpg',
      description: "Rebelión en la granja (en inglés, Animal Farm) es una novela corta satírica del escritor británico George Orwell. ... En la ficción de la novela un grupo de animales de una granja expulsa a los humanos tiranos y crean un sistema de gobierno propio que acaba convirtiéndose en otra tiranía brutal.",
      author: 'George Orwell',
      editorial: 'Harvill Secker',
      price: 29.95,
    },
    {
      id: '2',
      name: 'Decamerón',
      genre: 'Novela',
      date: '1349',
      cover: 'https://www.alianzaeditorial.es/imagenes/libros/grande/9788491819585-decameron.jpg',
      description: "El Decamerón (Decameron o Decamerone, en italiano), subtitulado Príncipe Galeoto (Prencipe Galeotto en italiano antiguo), es un libro constituido por cien cuentos, algunos de ellos novelas cortas, escritos por Giovanni Boccaccio entre 1351 y 1353.",
      author: 'Giovanni Boccaccio',
      editorial: 'Giunta',
      price: 14.99,
    },
    {
      id: '3',
      name: 'Madame Bovary',
      genre: 'Novela, Realismo, Modernismo',
      date: '1857',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Madame_Bovary_1857_%28hi-res%29.jpg',
      description: "Emma Bovary, hija de un campesino acomodado y esposa de un médico mediocre (Charles). Es sensual, llena de sueños, varios de ellos egoístas y vacíos, ve frustrados sus anhelos en medio de la vida provinciana. ... Acosada por las deudas, y harta de la vida, se suicida.",
      author: 'Gustave Flaubert',
      editorial: 'La Revue de Paris',
      price: 19.99,
    },
    {
      id: '4',
      name: 'Los Miserables',
      genre: 'Novela, Tragedia, Épico',
      date: '1869',
      cover: 'https://2.bp.blogspot.com/-OQE93sdgHaY/VeeyfIB9s_I/AAAAAAAAB3s/OTDTBZdKoKU/s1600/miserables.jpg',
      description: "Novela publicada en 1862, además de otras consideraciones, constituye un completo mosaico de la sociedad francesa de principios del siglo XIX. Es una denuncia despiadada de las condiciones de vida de la clase baja y una defensa de la bondad del hombre, en la línea de los ideales del autor.",
      author: 'Victor Hugo',
      editorial: 'Albert Lacroix',
      price: 29.99,
    }
  ]
  constructor(private bookdbService: BookdbService, private route: Router) { }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.books !== undefined) {
      this.books.splice(0);
    }
    this.retrieveValues();
  }

  inicialization() {
    if (this.bookdbService.empty()) {
      this.booksinit.forEach(book => {
        this.bookdbService.setItem(book.id, book);
      });
    }
  }

  retrieveValues() {
    // Retrieve values
    this.bookdbService.getAll().then(
      (data) => this.books = data
    );
  }
  
  bookTapped(book) {
    this.route.navigate(['details', book.id]);
  }
}

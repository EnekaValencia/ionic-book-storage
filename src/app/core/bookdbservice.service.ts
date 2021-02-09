import { Injectable } from '@angular/core';
import { IBook } from '../share/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class BookdbService {
  auxBook: IBook;
  auxBookList: IBook[] = [];

  constructor(private storage: Storage) { }
  
  // Stores a value
  setItem(reference: string, value: IBook) {
    this.storage.set(reference, {
      id: value.id, 
      name: value.name, 
      genre: value.genre, 
      date: value.date, 
      cover: value.cover, 
      description: value.description,
      author: value.author,
      editorial: value.editorial,
      price: value.price,
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IBook> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IBook[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IBook) => this.auxBookList.push(data)
        );
      });

      return this.auxBookList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}

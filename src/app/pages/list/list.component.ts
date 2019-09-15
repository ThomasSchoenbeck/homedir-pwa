import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/models/item';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items: Observable<Item[]> = null;
  private userId: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.userId = user.uid;
        this.getItemsList();
      }
    });

    // this.items = db.collection<Item>(this.auth.user$.pipe(map()) + 'items').valueChanges();
  }

  ngOnInit() {
  }

  getItemsList() {
    if (!this.userId) { return; }
    this.items = this.db.collection<Item>('items', ref => ref.where('user', '==', this.userId).orderBy('createdAt') ).valueChanges();
  }

  addItem(e) {
    console.log(`running addItem(${e.value})`);
    this.db.collection<Item>('items').add({checked: false, name: e.value, user: this.userId, createdAt: new Date()});
    e.value = '';
  }

  addOne() {
    // this.items.pipe(map( itemList => itemList.push({checked: false, name: ''})));

  }

  deleteOne(index: number) {
    console.log(`running deleteOne(${index})`);
    this.items.pipe(map( itemList => itemList.splice(index, 1)));
  }

  toggleChecked(e: HTMLElement, i: number) {
    console.log(e);
    if (!this.items[i].checked) {
      e.parentElement.parentElement.classList.add('checked');
    } else {
      e.parentElement.parentElement.classList.remove('checked');
    }

    this.items[i].checked = !this.items[i].checked;
    console.log(`we are checked ${this.items[i].checked}`);
  }

}

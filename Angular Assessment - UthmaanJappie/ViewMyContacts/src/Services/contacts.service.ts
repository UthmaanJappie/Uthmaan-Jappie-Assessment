import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from 'src/Services/Contacts';
import { Age } from 'src/Services/Agify'
import { environment} from 'src/environments/environment';
import { Observable, map,Subject } from 'rxjs';
import { catchError,tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  items: Observable<Contacts[]> =this.http.get<Contacts[]>(environment.contactUrl).pipe(
    map(x => x),
    catchError(error => {
      console.log('Caught in CatchError. Throwing error' + error)
      throw new Error(error)
    })
  );
  contactsChange$ = new Subject<any>();
  private contactsList:Contacts[] = [];
  constructor(private http:HttpClient) {

  }
  addContacts(contact: Contacts) {
    /* this.items.pipe(tap(c => {
      c.push(contact);
    })); */
    this.contactsList.push(contact);
    this.contactsChange$.next(this.contactsList);
  }
  getContacts(){

    return this.items.pipe(tap(data => {
      this.contactsList = data;
      this.contactsChange$.next(this.contactsList);
    }));;
    //return of(mockContacts);
  }
  getContactDetails(cellNumber:number | string){
    return this.getContacts().pipe(
      // (+) before `id` turns the string into a number
      map((contacts: Contacts[]) => contacts.find(contact => contact.cellNumber === cellNumber)! )
    );
  }

  predictAge(firstName:string){
    /* return this.http.get<Age>(environment.agifyURL + firstName).pipe(
      map(x => x),
      catchError(error => {
        console.log('Caught in CatchError. Throwing error' + error)
        throw new Error(error)
      })
    ); */

    return this.http.get<Age>(environment.agifyURL + firstName).pipe(
      map(x => x),
      catchError(error => {
        console.log('Caught in CatchError. Throwing error' + error)
        throw new Error(error)
      })
    );
  }
 /*  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }

  filter(filterBy:string){
    this._listeners.next(filterBy);
  } */
}

import { Component,OnInit  } from '@angular/core';
import { ContactsService } from 'src/Services/contacts.service'
import { Contacts } from 'src/Services/Contacts'
import { Age } from 'src/Services/Agify'
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap,tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {AddContactModalComponent} from 'src/app/add-contact-modal/add-contact-modal.component'


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

   Contacts!: Contacts[];
   Contacts$!: Observable<Contacts[]>;
   age$!: Observable<Age[]>;
   selectedId = '';
   searchText: string = '';
  constructor(private contactService:ContactsService, private route: ActivatedRoute,private dialogRef : MatDialog){
  }

  ngOnInit(): void{
    this.contactService.getContacts().subscribe(data => {this.Contacts = data});
   this.contactService.contactsChange$.subscribe(data => {this.Contacts = data});
      //this.ContactList();
  }

  ContactList(){
    this.Contacts$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = params.get('cellNumber')!;
        return this.contactService.getContacts();
      })
    );
  }
onSearchTextEntered(searchValue:string){
 this.searchText = searchValue;
}

  openDialog(){
    this.dialogRef.open(AddContactModalComponent,{
    });
  }
}

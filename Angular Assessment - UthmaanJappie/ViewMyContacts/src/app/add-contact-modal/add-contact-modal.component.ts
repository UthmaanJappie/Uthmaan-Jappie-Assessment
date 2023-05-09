import { Component,Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {  FormBuilder, NgForm } from '@angular/forms';
import { Contacts } from 'src/Services/Contacts';
import { ContactsService } from 'src/Services/contacts.service'
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.css']
})
export class AddContactModalComponent implements OnInit{

  addContactsForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  Contacts$!: Observable<Contacts[]>;
  constructor( public dialogRef: MatDialogRef<AddContactModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private formBuilder: FormBuilder,
               private contactService:ContactsService,
               private route: ActivatedRoute){}
    ngOnInit(): void {
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    keyPress(event:any) {
      const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
    onSubmit(contact:Contacts): void {
      // Process contact data here
      //this.addContactsForm.reset();
      //this.dialogRef.close();
      this.Contacts$ = this.route.paramMap.pipe(
        switchMap(params => {
          return this.contactService.getContacts();
        })
      );
      this.AddContact(contact);

      this.dialogRef.close();
      //this.contactService.filter('Register click');
    }

    AddContact(contact:Contacts)
    {

      this.contactService.addContacts(contact);
      window.alert("Added a Contact Successfully!");
    }
}

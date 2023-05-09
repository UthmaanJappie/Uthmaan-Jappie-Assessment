import { Component,Input,OnInit  } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Contacts } from 'src/Services/Contacts'
import { Age } from 'src/Services/Agify'
import { ContactsService } from 'src/Services/contacts.service'
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit{


   contact$!: Observable<Contacts>;
   age$!: Observable<Age[]>;
   ageArray!:Age;
   predictedAge!:Number;
   constructor(private activatedRoute:ActivatedRoute,private router: Router,private contactService:ContactsService){}

  ngOnInit(): void{
    this.contact$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.contactService.getContactDetails(params.get('cellNumber')!)));

    /*   this.age$ = this.route.paramMap.pipe(
        switchMap(params => {
          this.selectedId = parseInt(params.get('id')!, 10);
          return this.contactService.predictAge(selectedId);
        })
      ); */

      this.contact$.subscribe((response: Contacts) => {

        this.contactService.predictAge(response.firstName).subscribe((response: Age) => {
          this.ageArray = response;
          this.predictedAge = this.ageArray.age;
          console.log( this.predictedAge);
        }, (error) => {
          console.log('error', error);
        }, () => {
          console.log('complete');
        });
      }, (error) => {
        console.log('error', error);
      }, () => {
        console.log('complete');
      });



    /*   this.age$ = this.contactService.predictAge().subscribe((response: Number) => {
        console.log(response);
        this.predictedAge = response;
      }, (error) => {
        console.log('error', error);
      }, () => {
        console.log('complete');
      }); */
  }
}

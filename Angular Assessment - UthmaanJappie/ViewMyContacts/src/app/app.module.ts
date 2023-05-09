import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common'
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideContactNavbarComponent } from './navbar/Side-Nav/side-contact-navbar/side-contact-navbar.component';
import { ContactListComponent } from './Contacts/Contact-List/contact-list/contact-list.component';
import { ContactDetailsComponent } from './Contacts/Contact-Details/contact-details/contact-details.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactsService} from 'src/Services/contacts.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { AddContactModalComponent } from './add-contact-modal/add-contact-modal.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { SearchComponentComponent } from './search-component/search-component.component';

const routes:Routes = [
  { path: '', component: ContactListComponent,
  children: [
    // { path: '', component:  AComponent },
    { path: 'ContactDetail/:cellNumber', component:  ContactDetailsComponent },] },
  { path: 'about-me', component: AboutMeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideContactNavbarComponent,
    ContactListComponent,
    ContactDetailsComponent,
    AboutMeComponent,
    AddContactModalComponent,
    SearchFilterPipe,
    SearchComponentComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit{
  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact = this.contactService.getEmptyContact()

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => data['contact']),
        filter(contact => contact))
      .subscribe(contact => {
        this.contact = contact
      })
  }

  onSaveContact() {
    this.contactService.saveContact(this.contact as Contact)
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
      .pipe(take(1))
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }
}

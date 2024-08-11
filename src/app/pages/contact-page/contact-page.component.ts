import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {
  private contactService = inject(ContactService)
  contacts$!: Observable<Contact[]>

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
  }
}

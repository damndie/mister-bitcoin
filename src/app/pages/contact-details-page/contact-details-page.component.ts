import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Contact } from '../../models/contact.model';
@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent {
  private route = inject(ActivatedRoute)
  

  contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))
}

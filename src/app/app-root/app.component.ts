import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private contactService = inject(ContactService)
  ngOnInit(): void {
    this.contactService.loadContacts()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('Had issues loading contacts:', err)
      })
  }
}

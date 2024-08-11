import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ContactService } from '../../services/contact.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ContactFilterBy } from '../../models/contact.model';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  private ContactService = inject(ContactService)
  filterSubject$ = new Subject()

  filterBy!: ContactFilterBy

  ngOnInit(): void {
    this.ContactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        () => this.ContactService.setFilterBy(this.filterBy)
      )
  }

  onSetFilterBy(value: string) {
    this.filterSubject$.next(value)
  }
}

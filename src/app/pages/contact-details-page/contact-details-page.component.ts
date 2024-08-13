import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent {
  private route = inject(ActivatedRoute)
  private userService = inject(UserService)

  contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))

  user: User = this.userService.getUser()

  onAddMove(updatedUser: User) {

    this.user = { ...this.user, moves: [...updatedUser.moves] }
  }
}

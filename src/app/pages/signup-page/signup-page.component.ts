import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  private userService = inject(UserService)
  private router = inject(Router)

  username = ''

  onSignup() {
    this.userService.signup(this.username)
      .subscribe({
        next: () => this.router.navigateByUrl('/home'),
        error: err => console.log('err:', err)
      })
  }
}

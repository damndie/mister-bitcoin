import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private router = inject(Router)
  user!: User
  BTC$!: Observable<string>

  constructor(private userService: UserService, private bitcoinService: BitcoinService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.BTC$ = this.bitcoinService.getRate(this.user.coins)
  }

  onLogout() {
    this.userService.logout()
    this.router.navigateByUrl('/signup')
  }

  onRefillCoins() {
    this.user.coins = 100;
    this.userService.updateUser(this.user)
  }

  shouldShowRefillButton(): boolean {
    return this.user.coins === 0
  }
}

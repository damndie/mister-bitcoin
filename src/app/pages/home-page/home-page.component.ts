import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  user: User = this.userService.getUser()
  rate!: number

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.bitcoinService.getRate(this.user.coins)
      this.rate = res.data
    } catch (err) {
      console.log('Loading rate -> Had issues loading rate:', err)
    }
  }
}

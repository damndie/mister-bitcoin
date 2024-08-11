import { Component, OnInit, inject } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';

export type BitcoinValues = {
  x: number
  y: number
}
@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrl: './statistic-page.component.scss'
})
export class StatisticPageComponent implements OnInit{
  private bitcoinService = inject(BitcoinService)
  marketValues!: BitcoinValues[]
  confirmedTransactions!: BitcoinValues[]

  async ngOnInit(): Promise<void> {
    try {
      const marketValues = await this.bitcoinService.getMarketPrice()
      this.marketValues = marketValues

      const confirmedTransactions = await this.bitcoinService.getConfirmedTransactions()
      this.confirmedTransactions = confirmedTransactions
    }
    catch (err) {
      console.log('Statistic page -> Had issues loading statistic', err)
    }
  }
}

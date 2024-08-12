import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';


interface Trade {
  name: string
  value: number
}
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  saleData = [
    { name: '08/13/2024', value: 494762556.34959996 },
    { name: '08/12/2024', value: 480199475.88900006 },
    { name: '08/11/2024', value: 332409438.7548 },
    { name: '08/10/2024', value: 289094884.176 },
    { name: '08/09/2024', value: 777492583.0165 },
    { name: '08/08/2024', value: 277078998.492 },
    { name: '08/07/2024', value: 252736299.37800002 },
    { name: '08/06/2024', value: 367826530.49249995 },
    { name: '08/01/2024', value: 522506214.22769994 },
    { name: '08/02/2024', value: 479668944.2496 },
    { name: '08/03/2024', value: 431885271.2832 }
  ]

  trades$!: Observable<Trade>
  subscription!: Subscription

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    this.trades$ = this.bitcoinService.getTradeVolume()
  }

}

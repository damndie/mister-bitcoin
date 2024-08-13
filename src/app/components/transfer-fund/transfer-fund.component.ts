import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent {
  private userService = inject(UserService)
  @Input() contact!: Contact
  @Output() addMove = new EventEmitter<User>()

  amountToTransfer: number | null = null
  maxCoins = this.userService.getUser().coins

  onTransferCoins = () => {
    if (this.amountToTransfer) {
      const updatedUser = this.userService.addMove(this.contact, this.amountToTransfer)
      this.maxCoins = this.userService.getUser().coins
      this.amountToTransfer = null

      this.addMove.emit(updatedUser)
    }
  }
}

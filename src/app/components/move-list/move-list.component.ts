import { Component, Input, OnInit } from '@angular/core';
import { Move } from '../../models/move.model';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.scss'
})
export class MoveListComponent implements OnInit{
  @Input() moves!: Move[]
  @Input() title!: string
  @Input() contact: Contact | null = null

  ngOnInit(): void {
    if (!this.contact) {
      this.moves = this.moves.reverse().slice(0, 3)
    }
  }
}

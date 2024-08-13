import { Component, Input } from '@angular/core';
import { Move } from '../../models/move.model';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'move-preview',
  templateUrl: './move-preview.component.html',
  styleUrl: './move-preview.component.scss'
})
export class MovePreviewComponent {
  @Input() move!: Move
  @Input() contact: Contact | null = null
}

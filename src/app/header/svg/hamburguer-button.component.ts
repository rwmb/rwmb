import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hamburguer-button',
  templateUrl: './hamburguer-button.html',
  styleUrls: ['hamburguer-button.scss']
})
export class HamburguerButtonComponent {
  @Input() isOpen = false;
}

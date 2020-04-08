import { Component, Input } from '@angular/core';


@Component({
  selector: 'outline-profile',
  templateUrl: './outline-profile.html',
  styleUrls: ['./outline-profile.scss']
})
export class OutlineProfileComponent {
  @Input() state: string;
}

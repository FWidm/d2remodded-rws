import {Component, Input} from '@angular/core';
import {Rune} from "../models";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-rune',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rune.component.html',
  styleUrl: './rune.component.css'
})
export class RuneComponent {
  @Input()
  name: string = "";
  @Input()
  rune: Rune | undefined = undefined;
}

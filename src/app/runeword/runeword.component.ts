import {Component, Input} from '@angular/core';
import {Runes, Runeword} from "../models";
import {CommonModule} from "@angular/common";
import {RuneComponent} from "../rune/rune.component";

@Component({
  selector: 'app-runeword',
  standalone: true,
  imports: [CommonModule, RuneComponent],
  templateUrl: './runeword.component.html',
  styleUrl: './runeword.component.css'
})
export class RunewordComponent {
  @Input()
  name: string = ""
  @Input()
  data: Runeword | null = null;
  @Input()
  runes: Runes | null = null;
}

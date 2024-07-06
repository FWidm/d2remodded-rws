import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Runes} from "../models";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RuneComponent} from "../rune/rune.component";

@Component({
  selector: 'app-rune-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RuneComponent],
  templateUrl: './rune-selector.component.html',
  styleUrl: './rune-selector.component.css'
})
export class RuneSelectorComponent {
  form = new FormGroup({});

  private _runes: Runes | null = null;

  @Output()
  selected = new EventEmitter<string[]>();

  constructor() {
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  @Input() set runes(value: Runes | null) {
    this._runes = value;

    const runeNames = this.getKeys(this.runes);
    runeNames.forEach(r => this.form.addControl(r, new FormControl(false)));
  };

  get runes() {
    return this._runes;
  }

  getCheckedValues(){
    const selected:string[] = [];

    Object.keys(this.form.controls).forEach(key => {
      let value = this.form.get(key)?.value;
      if (value == true) {
        selected.push(key);
      }
    });
    return selected;
  }

  updateSelected() {
    if (!this.form)
      return;
    this.selected.emit(this.getCheckedValues());
  }
}

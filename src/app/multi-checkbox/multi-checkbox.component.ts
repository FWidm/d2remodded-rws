import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RuneComponent} from "../rune/rune.component";

@Component({
  selector: 'app-multi-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RuneComponent],
  templateUrl: './multi-checkbox.component.html',
  styleUrl: './multi-checkbox.component.css'
})
export class MultiCheckboxComponent {
  form = new FormGroup({});

  private _values: string[] | null = null;

  @Output()
  selected = new EventEmitter<string[]>();

  constructor() {
  }

  @Input() set values(values: string[] | null) {
    console.log(values)
    this._values = values;
    if (values){
    values.forEach(r => this.form.addControl(r, new FormControl(false)));
    }

  };

  get values() {
    return this._values;
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

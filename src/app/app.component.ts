import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Runes, Runeword} from "./models";
import {RunewordComponent} from "./runeword/runeword.component";
import {CommonModule} from "@angular/common";
import {RuneComponent} from "./rune/rune.component";
import {RuneSelectorComponent} from "./rune-selector/rune-selector.component";
import {MultiCheckboxComponent} from "./multi-checkbox/multi-checkbox.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RunewordComponent, CommonModule, RuneComponent, RuneSelectorComponent, MultiCheckboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'd2remodded-rw';
  runewords: Runeword[] = [];
  runes: Runes | null = null;
  itemTypes: string[] = [];

  selectedRunes: string[] = [];
  selectedTypes: string[] = [];

  foundRunewords: Runeword[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Runeword[]>('/runewords.json').subscribe(data => {
      this.runewords = data;
      this.filter();
    });
    this.http.get<Runes>('/runes.json').subscribe(data => {
      this.runes = data;
    });
    this.http.get<string[]>('/types.json').subscribe(data => {
      this.itemTypes = data;
    });

  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  filter() {
    let found: Runeword[] = [];

    if (this.runewords) {
      // Filter based on selected runes if any are selected
      if (this.selectedRunes.length > 0) {
        found = this.runewords.filter(rw =>
          rw.runes.every(rune => this.selectedRunes.includes(rune))
        );
      } else {
        found = this.runewords;
      }

      // Further filter based on selected types if any are selected
      if (this.selectedTypes.length > 0) {
        found = found.filter(rw =>
          rw.item_types.some(type => this.selectedTypes.includes(type))
        );
      }
    }

    this.foundRunewords = found;
  }

  updateSelectedRunes($event: string[]) {
    this.selectedRunes = $event;
    this.filter();
  }

  updateSelectedTypes($event: string[]) {
    this.selectedTypes = $event;
    this.filter();
  }

}

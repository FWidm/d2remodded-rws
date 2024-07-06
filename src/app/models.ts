export interface Runeword {
  name: string;
  rmd: string;
  aw: string;
  item_types: string[];
  clvl: number;
  runes: string[];
  class_rw: string | null;
  points: number;
  affixes: string[];
  rune_weight: number;
  sockets: number;
}

export interface Rune {
  id: number,
  runeFont: string
}

export interface Runes {
  [key: string]: Rune;
}


export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  close,
  open,
  flag,
}

export type Cell = {
  value: CellValue;
  state: CellState;
  position: number;
};

export enum Face {
  smile = '😀',
  oh = '😯',
  lost = '😣',
  won = '😎',
}

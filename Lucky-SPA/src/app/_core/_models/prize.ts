export interface Prize {
  prizeID: number;
  prizeName: string;
  qty: number | null;
  spinTime: number | null;
  image: string;
  visible: boolean;
  seq: number;
}

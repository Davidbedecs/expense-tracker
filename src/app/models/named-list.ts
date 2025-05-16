export interface NamedList {
  id: number;
  name: string;
  items: {
    id: number;
    quantity: number;
  }[];
}

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  month: string;
  recipient?: string;
  category?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconSrc: string;
}
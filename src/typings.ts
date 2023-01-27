export type Nullable<T = unknown> = T | null;

export interface IProduct {
  id                 : number;
  title              : string;
  description        : string;
  price              : number;
  discountPercentage : number;
  rating             : number;
  stock              : number;
  brand              : string;
  category           : string;
  thumbnail          : string;
  images             : string[];
}

export interface IProductsSearch {
  products : IProduct[];
  total    : number;
  skip     : number;
  limit    : number;
}

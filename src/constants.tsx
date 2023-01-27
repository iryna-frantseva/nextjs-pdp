import React, { ReactNode } from 'react';
import {
  BarsOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
}                           from '@ant-design/icons';
import { EAppRoute }        from './enums';
import { IProduct }         from './typings';

export const APP_ROUTES_NAMES: Record<EAppRoute, string> = {
  [EAppRoute.Home]       : 'Home',
  [EAppRoute.Categories] : 'Categories',
  [EAppRoute.Products]   : 'Products',
  [EAppRoute.Cart]       : 'Cart',
};

export const APP_ROUTES_ICONS: Record<EAppRoute, ReactNode> = {
  [EAppRoute.Home]       : '',
  [EAppRoute.Categories] : <BarsOutlined />,
  [EAppRoute.Products]   : <ShoppingOutlined />,
  [EAppRoute.Cart]       : <ShoppingCartOutlined />,
};

export const MENU_ROUTES_ORDER: EAppRoute[] = [
  EAppRoute.Categories,
  EAppRoute.Products,
  EAppRoute.Cart,
];

export const PRODUCT_DESCRIPTION_KEYS: (keyof IProduct)[] = [
  'rating',
  'brand',
  'category',
  'description',
  'price',
  'discountPercentage',
];

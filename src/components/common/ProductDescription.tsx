import React, {
  FC,
  useCallback,
  useMemo,
  ReactNode,
}                                   from 'react';
import {
  Rate,
  Tooltip,
  Button,
  Descriptions,
}                                   from 'antd';
import { ShoppingCartOutlined }     from '@ant-design/icons';
import {
  uniq,
  map,
  divide,
  capitalize,
}                                   from 'lodash';
import { IProduct }                 from '../../typings';
import { EAppRoute }                from '../../enums';
import { PRODUCT_DESCRIPTION_KEYS } from '../../constants';
import { Link }                     from './Link';

const { Item } = Descriptions;

export interface IDescriptionItem {
  label : string;
  value : ReactNode;
}

const getProductDescription = (product: IProduct) => map<keyof IProduct, IDescriptionItem>(
  PRODUCT_DESCRIPTION_KEYS,
  (descriptionKey) => {
    switch (descriptionKey) {
      case 'discountPercentage':
        return {
          label : 'Discount',
          value : divide(product[descriptionKey], 100).toLocaleString('en-US', {
              style                 : 'percent',
              maximumFractionDigits : 2,
            },
          ),
        };

      case 'category':
        return {
          label : capitalize(descriptionKey),
          value : (
            <Link href={`${EAppRoute.Categories}/${product[descriptionKey]}`}>
              {capitalize(product[descriptionKey])}
            </Link>
          ),
        };

      case 'price':
        return {
          label : capitalize(descriptionKey),
          value : product[descriptionKey].toLocaleString('en-US', {
            style    : 'currency',
            currency : 'USD',
          }),
        };

      case 'rating':
        return {
          label : capitalize(descriptionKey),
          value : (
            <Rate
              disabled
              allowHalf
              allowClear   = {false}
              defaultValue = {product[descriptionKey]}
            />
          ),
        };

      default:
        return {
          label : capitalize(descriptionKey),
          value : product[descriptionKey],
        };
    }
  },
);

interface IProps {
  product: IProduct;
}

export const ProductDescription: FC<IProps> = ({ product }) => {
  const descriptions = useMemo<IDescriptionItem[]>(
    () => getProductDescription(product),
    [product],
  );

  const onAddToCart = useCallback(() => {
    const cart: number[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

    localStorage.setItem(
      'cart',
      JSON.stringify(uniq<number>([...cart, product.id])),
    );
  }, [product]);

  return (
    <Descriptions
      column = {1}
      extra  = {(
        <Tooltip title="Add to Cart">
          <Button
            type    = "primary"
            shape   = "circle"
            icon    = {<ShoppingCartOutlined />}
            onClick = {onAddToCart}
          />
        </Tooltip>
      )}
    >
      {map(descriptions, ({ label, value }) => (
        <Item
          key   = {label}
          label = {label}
        >
          {value}
        </Item>
      ))}
    </Descriptions>
  );
};

import React, { FC } from 'react';
import {
  List,
  Typography,
  Avatar,
}                    from 'antd';
import { Link }      from './Link';
import { IProduct }  from '../../typings';
import { EAppRoute } from '../../enums';

const { Title } = Typography;

interface IProps {
  items   : IProduct[];
  header? : string;
}

export const ProductsList: FC<IProps> = ({ items, header }) => (
  <List
    header     = {<Title level={4}>{header}</Title>}
    dataSource = {items}
    renderItem = {({ id, title, description, thumbnail }) => (
      <List.Item>
        <List.Item.Meta
          title       = {<Link href={`${EAppRoute.Products}/${id}`}>{title}</Link>}
          avatar      = {<Avatar src={thumbnail} />}
          description = {description}
        />
      </List.Item>
    )}
  />
);

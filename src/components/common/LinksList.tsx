import React, { FC }          from 'react';
import { List, Typography }   from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link }               from './Link';

const { Title, Text } = Typography;

export interface IListItem {
  name  : string;
  route : string;
}

interface IProps {
  items   : IListItem[];
  header? : string;
  column? : number;
}

export const LinksList: FC<IProps> = ({ items, header, column = 1 }) => (
  <List
    header     = {<Title level={4}>{header}</Title>}
    grid       = {{ column }}
    dataSource = {items}
    renderItem = {({ route, name }) => (
      <List.Item key={route}>
        <Text>Go to </Text>

        <Link href={route}>
          {name}
          &nbsp;
          <ArrowRightOutlined />
        </Link>
      </List.Item>
    )}
  />
);

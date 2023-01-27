import { FC }         from 'react';
import Head           from 'next/head';
import { Typography } from 'antd';
import { map }        from 'lodash';
import { EAppRoute }  from '../src/enums';
import {
  MENU_ROUTES_ORDER,
  APP_ROUTES_NAMES,
}                     from '../src/constants';
import {
  LinksList,
  IListItem,
}                     from '../src/components/common/LinksList';

const { Title, Text } = Typography;

const HOME_PAGE_LINKS = map<EAppRoute, IListItem>(MENU_ROUTES_ORDER, (route) => ({
  name: APP_ROUTES_NAMES[route],
  route,
}));

const Home: FC = () => (
  <>
    <Head>
      <title>Home</title>
      <meta name="description" content="Some Home description text" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Title>Home</Title>

    <Title level={2}>
      Important text about Your Company
    </Title>

    <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias deleniti est, et fuga impedit ipsa magni
      modi nesciunt nisi non nostrum pariatur ratione recusandae rerum similique sunt totam. Ea exercitationem fugiat
      ratione. Alias architecto asperiores culpa dolorem doloribus enim in ipsum, magnam minus obcaecati officiis,
      porro quaerat quia reiciendis repellat repudiandae rerum, saepe similique soluta sunt tenetur veniam voluptas
      voluptate. Alias, asperiores cum deserunt esse nesciunt nulla omnis saepe tempora? Alias consequatur cum delectus
      deleniti dolorem eos esse est fugit impedit ipsum iusto maiores modi neque nihil nulla obcaecati, officiis quaerat
      quia ratione reprehenderit sed sit tempore vel voluptatem?
    </Text>

    <LinksList items={HOME_PAGE_LINKS} />
  </>
);

export default Home;

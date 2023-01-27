import { FC, useMemo }    from 'react';
import { GetStaticProps } from 'next';
import Head               from 'next/head';
import { Typography }     from 'antd';
import { map }            from 'lodash';
import {
  LinksList,
  IListItem,
}                         from '../../src/components/common/LinksList';
import { callApi }        from '../../src/apiCaller';
import { EAppRoute }      from '../../src/enums';

const { Title, Text } = Typography;

interface IProps {
  categories: string[];
}

const Categories: FC<IProps> = ({ categories }) => {
  const categoriesLinks = useMemo<IListItem[]>(() => map<string, IListItem>(categories, (category) => ({
    name  : category,
    route : `${EAppRoute.Categories}/${category}`,
  })), [categories]);

  return (
    <>
      <Head>
        <title>Categories</title>
        <meta name="description" content="Some Categories description text" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>Categories</Title>

      <Title level={2}>SEO text about Categories</Title>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut exercitationem fugiat harum minus quidem quos ut
        voluptatum! Aliquam, cum, temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cumque
        debitis distinctio doloremque et impedit nam neque non pariatur porro?
      </Text>

      <LinksList
        items  = {categoriesLinks}
        header = "Categories"
        column = {3}
      />
    </>
  );
};


export const getStaticProps: GetStaticProps<IProps> = async () => {
  const { data: categories } = await callApi<string[]>('/categories');

  return {
    props: { categories },
  };
};


export default Categories;

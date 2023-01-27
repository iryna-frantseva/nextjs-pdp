import { FC }                 from 'react';
import { GetServerSideProps } from 'next';
import Head                   from 'next/head';
import { Typography }         from 'antd';
import { IProductsSearch }    from '../../src/typings';
import { callApi }            from '../../src/apiCaller';
import { ProductsList }       from '../../src/components/common/ProductsList';

const { Title } = Typography;

const Products: FC<IProductsSearch> = ({ products }) => (
  <>
    <Head>
      <title>Products</title>
      <meta name="description" content="Some Products description text" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Title>Products</Title>

    <ProductsList items={products} />
  </>
);

export const getServerSideProps: GetServerSideProps<IProductsSearch> = async () => {
  const { data } = await callApi<IProductsSearch>('?skip=0&limit=100');

  return {
    props: data,
  };
};

export default Products;

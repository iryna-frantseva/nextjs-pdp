import { FC, useMemo }     from 'react';
import {
  GetStaticProps,
  GetStaticPaths,
}                          from 'next';
import Head                from 'next/head';
import { useRouter }       from 'next/router';
import { Typography }      from 'antd';
import { map, capitalize } from 'lodash';
import { IProductsSearch } from '../../src/typings';
import { callApi }         from '../../src/apiCaller';
import { ProductsList }    from '../../src/components/common/ProductsList';

const { Title, Text } = Typography;

type TParams = {
  category: string;
};

interface IPath {
  params: TParams;
}

interface IProps {
  category: IProductsSearch;
}

const Category: FC<IProps> = ({ category }) => {
  const { query } = useRouter();

  const categoryName = useMemo<string>(
    () => capitalize(query.category as string),
    [query],
  );

  return (
    <>
      <Head>
        <title>{categoryName}</title>
        <meta name="description" content={`Some ${categoryName} description text`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>{categoryName}</Title>

      <Title level={2}>SEO text about {categoryName}</Title>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem doloribus dolorum harum numquam quo
        sequi soluta voluptates. Aperiam, fuga, odio! A adipisci aliquid aperiam architecto autem beatae culpa
        cupiditate debitis, dolor ducimus error eum excepturi facilis ipsum, iusto natus nostrum, odio omnis
        perspiciatis porro possimus provident quae quasi ratione unde vero voluptatum? Ad aperiam cupiditate deserunt
        dicta, excepturi exercitationem id illo libero modi nisi, odio officiis quasi quisquam reprehenderit sunt.
        Accusantium, distinctio possimus. Amet cupiditate distinctio doloribus illo, inventore labore quae quas repellat
        sapiente tenetur ut voluptate? At blanditiis debitis, ipsum libero molestiae officia quaerat reprehenderit sed
        sunt voluptas!
      </Text>

      <ProductsList
        items  = {category.products}
        header = {`Products in ${categoryName}`}
      />
  </>
  );
};

export const getStaticPaths: GetStaticPaths<TParams> = async () => {
  const { data: categories } = await callApi<string[]>('/categories');

  return {
    fallback : true,
    paths    : map<string, IPath>(categories, (category) => ({
      params: { category },
    })),
  };
};

export const getStaticProps: GetStaticProps<IProps, TParams> = async ({ params }) => {
  const { data: category } = await callApi<IProductsSearch>(`/category/${params?.category}`);

  return {
    props: { category },
  };
};

export default Category;

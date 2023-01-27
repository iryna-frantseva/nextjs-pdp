import { FC }                 from 'react';
import { GetServerSideProps } from 'next';
import Head                   from 'next/head';
import Image                  from 'next/image';
import {
  Typography,
  Carousel,
  Row,
  Col,
}                             from 'antd';
import { map }                from 'lodash';
import { IProduct }           from '../../src/typings';
import { callApi }            from '../../src/apiCaller';
import { ProductDescription } from '../../src/components/common/ProductDescription';

const { Title } = Typography;

type TParams = {
  productId: string;
};

interface IProps {
  product: IProduct;
}

const Product: FC<IProps> = ({ product }) => {
  const {
    title,
    description,
    images,
  } = product;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>{title}</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Carousel autoplay>
            {map(images, (image) => (
              <Image
                key    = {image}
                src    = {image}
                alt    = {`${title} image`}
                width  = {500}
                height = {500}
              />
            ))}
          </Carousel>
        </Col>

        <Col span={12}>
          <ProductDescription product={product} />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IProps, TParams> = async ({ params }) => {
  const { data: product } = await callApi<IProduct>(`/${params?.productId}`);

  return {
    props: { product },
  };
};

export default Product;



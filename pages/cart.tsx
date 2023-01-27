import { FC }              from 'react';
import Head                from 'next/head';
import { useRouter }       from 'next/router';
import { Button, Row }     from 'antd';
import { EAppRoute }       from '../src/enums';
import { useCartProducts } from '../src/hooks/useCartProducts';
import { ProductsList }    from '../src/components/common/ProductsList';

const Cart: FC = () => {
  const { push } = useRouter();

  const { data: cartProducts } = useCartProducts();

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Your important purchases!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductsList
        header = "Your important purchases!"
        items  = {cartProducts ?? []}
      />

      <Row justify="center">
        <Button
          type    = "primary"
          onClick = {() => push(EAppRoute.Home)}
          size    = "large"
        >
          Finish
        </Button>
      </Row>
    </>
  );
};

export default Cart;

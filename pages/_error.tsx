import { FC }        from 'react';
import Head          from 'next/head';
import { Result }    from 'antd';
import { EAppRoute } from '../src/enums';
import { Link }      from '../src/components/common/Link';

const Error: FC = () => (
 <>
   <Head>
     <title>ERROR</title>
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <link rel="icon" href="/error-favicon.ico" />
   </Head>

   <Result
    status   = "500"
    subTitle = "Sorry, something went wrong."
    extra    = {(
      <Link href={EAppRoute.Home}>
        Back Home
      </Link>
    )}
  />
 </>
);

export default Error;

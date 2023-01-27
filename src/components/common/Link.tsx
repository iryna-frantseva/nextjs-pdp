import React, {
  FC,
  PropsWithChildren,
}                               from 'react';
import NextLink, { LinkProps }  from 'next/link';
import { Typography }           from 'antd';

export const Link: FC<PropsWithChildren<LinkProps>> = ({ children, ...linkProps }) => (
  <NextLink {...linkProps} passHref legacyBehavior>
    <Typography.Link>
      {children}
    </Typography.Link>
  </NextLink>
);

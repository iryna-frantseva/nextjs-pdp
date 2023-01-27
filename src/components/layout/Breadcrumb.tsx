import React, { useMemo }               from 'react';
import { useRouter }                    from 'next/router';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import {
  split,
  map,
  join,
  capitalize,
}                                       from 'lodash';
import { Nullable }                     from '../../typings';
import { EAppRoute }                    from '../../enums';
import { APP_ROUTES_NAMES }             from '../../constants';
import { Link }                         from '../common/Link';

const { Item } = AntdBreadcrumb;

export const getNameFromRoute = (route: string) => join(
  map<string, string>(
    split(route.replace('/', ''), '-'),
    capitalize,
  ),
  ' ',
);

interface IBreadcrumbItem {
  route : string;
  label : string;
}

export const Breadcrumb = () => {
  const { asPath } = useRouter();

  const breadcrumbItems = useMemo<IBreadcrumbItem[]>(() => {
    const [, appRouteString, pageRoute] = split(asPath, '/');

    const appRoute = `/${appRouteString}` as EAppRoute;
    const isHomePage = appRoute === EAppRoute.Home;

    const homeBreadcrumb: IBreadcrumbItem = {
      route : EAppRoute.Home,
      label : APP_ROUTES_NAMES[EAppRoute.Home],
    };

    const appRouteBreadcrumb: Nullable<IBreadcrumbItem> = !isHomePage ? {
      route : appRoute,
      label : APP_ROUTES_NAMES[appRoute],
    } : null;

    const pageBreadcrumb: Nullable<IBreadcrumbItem> = (!isHomePage && pageRoute) ? {
      route : `${appRoute}/${pageRoute}`,
      label : getNameFromRoute(pageRoute),
    } : null;

    return [
      homeBreadcrumb,
      ...(appRouteBreadcrumb ? [appRouteBreadcrumb] : []),
      ...(pageBreadcrumb ? [pageBreadcrumb] : []),
    ];
  }, [asPath]);

  return (
    <AntdBreadcrumb>
      {map(breadcrumbItems, ({ route, label }) => (
        <Item key={route}>
          <Link href={route}>{label}</Link>
        </Item>
      ))}
    </AntdBreadcrumb>
  );
};

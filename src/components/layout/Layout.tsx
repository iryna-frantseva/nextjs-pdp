import React, {
  FC,
  PropsWithChildren,
  useMemo,
  useCallback,
}                        from 'react';
import { useRouter }     from 'next/router';
import {
  Layout as AntdLayout,
  Menu,
  Typography,
  Row,
  Col,
  Space,
  Avatar,
  MenuProps,
}                        from 'antd';
import { AppleOutlined } from '@ant-design/icons';
import { ItemType }      from 'antd/es/menu/hooks/useItems';
import { map, split }    from 'lodash';
import styled            from 'styled-components';
import { EAppRoute }     from '../../enums';
import {
  MENU_ROUTES_ORDER,
  APP_ROUTES_NAMES,
  APP_ROUTES_ICONS,
}                        from '../../constants';
import { Link }          from '../common/Link';
import { Breadcrumb }    from './Breadcrumb';

const { Header, Content, Footer } = AntdLayout;
const { Text }                    = Typography;

const StyledLayout = styled(AntdLayout)`
  height: 100vh;
`;

const StyledContent = styled(Content)`
  padding  : 50px;
  overflow : scroll;
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

const StyledCol = styled(Col)`
  text-align: center;
`;

const MENU_ITEMS: ItemType[] = map<EAppRoute, ItemType>(MENU_ROUTES_ORDER, (route) => ({
  key   : route,
  label : <Link href={route}>{APP_ROUTES_NAMES[route]}</Link>,
  icon  : APP_ROUTES_ICONS[route],
}));

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { route, push } = useRouter();

  const activeMenuKey = useMemo<string>(() => {
    const [, appRoute] = split(route, '/');

    return `/${appRoute}`;
  }, [route]);

  const onMenuSelect = useCallback<NonNullable<MenuProps['onSelect']>>(
    async ({ key }) => push(key),
    [push],
  );

  return (
    <StyledLayout>
      <Header>
        <Row justify="space-between">
          <Col span={1}>
            <Link href={EAppRoute.Home}>
              <Avatar
                icon = {<AppleOutlined />}
                size = "large"
              />
            </Link>
          </Col>

          <Col span={4}>
            <Menu
              theme        = "dark"
              items        = {MENU_ITEMS}
              mode         = "horizontal"
              selectedKeys = {[activeMenuKey]}
              onSelect     = {onMenuSelect}
            />
          </Col>
        </Row>
      </Header>

      <StyledContent>
        <StyledSpace
          direction = "vertical"
          size      = "large"
        >
          <Breadcrumb />

          {children}
        </StyledSpace>
      </StyledContent>

      <Footer>
        <Row justify="center">
          <StyledCol span={6}>
            <Text>Copyright ©</Text>

            <Link href={EAppRoute.Home}> Your Company Name </Link>

            <Text>{new Date().getFullYear()}</Text>
          </StyledCol>
        </Row>
      </Footer>
    </StyledLayout>
  );
};

import { useState, useEffect } from 'react'
import { Layout, Menu, Button, ConfigProvider, Breadcrumb, Badge, Dropdown } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  DownOutlined,
  CaretDownOutlined
} from '@ant-design/icons'

import './index.less'
import { useLocation, useNavigate, Outlet, useAppData } from 'umi'

const { Header, Sider, Content } = Layout;

const noAuthRoutes = ['/', '/dashboard', '/analyze', '/userManagement', '/userManagement1', '/monitor', '/workBench']
const MENU_CONFIG = [
  {
    label: 'Dashboard',
    route: '/',
    key: 'dashboard',
    icon: <DashboardOutlined />,
    children: [
      {
        label: '分析',
        route: '/analyze',
        key: 'analyze',
        icon: ''
      },
      {
        label: '监控',
        route: '/monitor',
        key: 'monitor',
        icon: ''
      },
      {
        label: '工作台',
        route: '/workBench',
        key: 'workBench',
        icon: ''
      }
    ]
  },
  {
    label: '订单管理',
    route: '/ordersManagement',
    key: 'ordersManagement',
    icon: ''
  },
  {
    label: '用户管理',
    route: '/userManagement',
    key: 'userManagement',
    icon: <TeamOutlined />,
    children: [
      {
        label: '用户管理1',
        route: '/userManagement1',
        key: 'userManagement1',
        icon: ''
      }
    ]
  }
]

export default function Index() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [items, setItems] = useState([])
  const [userData, setUserData] = useState({})
  const [breadcrumb, setBreadcrumb] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const [unreadNum, setUnreadNum] = useState(0)
  const { clientRoutes } = useAppData()
  const c = clientRoutes[0]

  console.log('clientRoutes: ', clientRoutes)

  const pathname = location.pathname // 获取到的是localhost:8001后面的地址


  /* 递归遍历菜单 */
  const filterMenus = (menuConfig, menuPermissions) => {
    return menuConfig.reduce((result, config) => {
      if (menuPermissions.includes(config.route)) {
        result.push({
          label: config.label,
          key: config.key,
          icon: config.icon,
          children: config.children ? filterMenus(config.children, menuPermissions) : undefined,
        });
      }
      return result
    }, []);
  };

  const findMenuPath = (menuConfig, targetRoute) => {
    const menuPath = []; // 用于存储菜单名称数组
    const routePath = []; // 用于存储路径数组
    const findPath = (menuConfig, targetRoute) => {
      for (const item of menuConfig) {
        const { label, route, children } = item;
        if (route === targetRoute) {
          menuPath.push(label);
          routePath.push(route);
          return true;
        }
        if (children && findPath(children, targetRoute)) {
          menuPath.unshift(label); // 将父菜单名称添加到数组的开头
          routePath.unshift(route); // 将父路径添加到数组的开头
          return true;
        }
      }
      return false;
    };
    findPath(menuConfig, targetRoute);
    console.log('[menuPath, routePath]：', [menuPath, routePath]);
    return [menuPath, routePath];
  };

  /* 初始化页面 */
  const initPage = () => {
    const menuPermissions = ['/', '/dashboard', '/analyze', '/userManagement', '/userManagement1', '/monitor', '/workBench', '/ordersManagement']
    const items = filterMenus(MENU_CONFIG, menuPermissions)
    console.log('items: ', items)
    setItems(items)

    const [menuNames, routePaths] = findMenuPath(MENU_CONFIG, pathname)
    console.log('menuNames: ', menuNames)
    setBreadcrumb(menuNames)
  }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    const parentKeys = items.map(item => item.key)
    if (latestOpenKey && parentKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || '{}')
    setUserData(userData)
    initPage()
    // 不需要权限的页面可直接访问
    if (noAuthRoutes.includes(pathname)) {
      navigate(pathname)
    }
  }, [pathname])

  const dropdownItems = [
    {
      key: '1',
      label: (
        <a
        // onClick={gotoPersonalDetail}
        >
          个人信息
        </a>
      ),
      icon: <i className='iconfont icon-gerenzhongxin'></i>,
    },
    {
      key: '2',
      label: (
        <a
        // onClick={handleLogout}
        >
          退出登录
        </a>
      ),
      icon: <i className='iconfont icon-tuichudenglu'></i>,
    }
  ]

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorBgContainer: '#fff'
        }
      }}
    >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            onClick={e => navigate(e?.keyPath[0] || '')}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={[pathname]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff', }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <span className='breadcrumb-title'>
              {breadcrumb[breadcrumb.length - 1]}
            </span>
            {/* 右侧用户信息 */}
            <div className='person-info-div'>
              <div className='personal-info'>
                <Dropdown menu={{ items: dropdownItems, }} placement="bottomRight">
                  <>
                    <div className='personal-img'>
                      <img src="https://img1.baidu.com/it/u=700819009,3287863552&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684342800&t=d7919f035c88e35c6ba1993e0b9f6014" alt="" />
                      {/* <img src={userData?.user?.avatarPath} alt="" /> */}
                    </div>
                    <div className='personal-summary'
                    // onClick={gotoPersonalDetail}
                    >
                      <span className='account-number'>
                        {/* {userData?.user?.account} */}
                        1234
                      </span>
                      <DownOutlined size={10} />
                    </div>
                  </>
                  {/* <i className='personal-arrow'><CaretDownOutlined /></i> */}
                </Dropdown>
              </div>
            </div>
          </Header>
          {/* <Breadcrumb
            items={[
              {
                title: 'Home',
              },
              ...breadcrumb.map(v => ({ title: v }))
            ]}
          /> */}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '#fff',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export interface RouteConfig {
  name: string;
  icon: string;
  path: string;
  redirect: string;
  type: 'MENU' | 'VIEW';
  component: string;
  children?: RouteConfig[];
  meta: {
    isKeepAlive: boolean;
    compName?: string;
    isHidden: boolean;
    [key: string]: any;
  };
  props: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccessRes {
  username: string;
  token: string;
  roles: string[];
  permissions: [];
  menus: RouteConfig[];
}

export interface Project {
  id?: string;
  lastModifyTime?: string;
  name: string;
  type: string;
  tags: string;
  category: string;
  percent: string;
  price: string;
  time: string;
  occupy: boolean;
}

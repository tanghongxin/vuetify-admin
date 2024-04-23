export interface RoutesConfig {
  name: string;
  icon: string;
  path: string;
  redirect: string;
  type: 'MENU' | 'VIEW';
  component: string;
  children?: RoutesConfig[];
  meta: {
    isKeepAlive: boolean;
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
  menus: RoutesConfig[];
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

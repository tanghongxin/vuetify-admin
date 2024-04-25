export interface AccountInfo {
  username: string;
  token: string;
  roles: string[];
  permissions: [];
  menus: RouteConfig[];
}

export interface LoginReq {
  username: string;
  password: string;
}

export type LoginRes = AccountInfo;

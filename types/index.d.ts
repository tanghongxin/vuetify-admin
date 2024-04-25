/// <reference path="auto-imports.d.ts" />
/// <reference path="components.d.ts" />

interface ApiRes<T> {
  data: T;
  message: string;
  success: boolean;
}

interface TableReq {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  groupBy: string[];
  [key: string]: any;
}

interface TableRes<T> {
  items: T[];
  total: number;
}

interface RouteConfig {
  name: string;
  icon: string;
  path: string;
  redirect: string;
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

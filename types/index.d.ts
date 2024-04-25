/// <reference path="auto-imports.d.ts" />
/// <reference path="components.d.ts" />

import { GlobalComponents } from 'vue';

type K = keyof GlobalComponents;
type GlobalComponent<T extends K> = GlobalComponents[T];

declare global {
  /**
   * InstanceType of globally registered component
   */
  type IOGC<T extends K> = InstanceType<GlobalComponent<T>>;

  /**
   * InstanceType of manually imported component
   */
  type IOC<T extends abstract new (...args: any[]) => any> = InstanceType<T>;

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
    path: string;
    redirect: string;
    component: string;
    children?: RouteConfig[];
    meta: {
      isKeepAlive: boolean;
      icon: string;
      compName?: string;
      isHidden: boolean;
      [key: string]: any;
    };
    props: boolean;
  }
}

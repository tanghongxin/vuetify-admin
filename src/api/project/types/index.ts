export interface ProjectInfo {
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

export interface ProjectTableReq extends TableReq {}

export type ProjectTableRes = TableRes<ProjectInfo>;

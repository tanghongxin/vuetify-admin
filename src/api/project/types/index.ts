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

export type GetTableResponseData = TableRes<ProjectInfo>;

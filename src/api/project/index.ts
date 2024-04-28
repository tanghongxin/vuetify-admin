import request from '@/utils/request';
import { ProjectInfo, ProjectTableReq, ProjectTableRes } from './types';

export * from './types';

export function addProject(data: ProjectInfo) {
  return request.post('/project', data);
}

export function editProject(data: ProjectInfo) {
  return request.put('/project', data);
}

export function deleteProject(id) {
  return request.delete(`/project/${id}`);
}

export function getProject(id) {
  return request.get<never, ProjectInfo>(`/project/${id}`);
}

export function getProjects(params: ProjectTableReq) {
  return request.get<ProjectTableReq, ProjectTableRes>('/projects', {
    params,
  });
}

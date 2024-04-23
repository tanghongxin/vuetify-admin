import request from '@/utils/request';
import { Project } from '@/types';

export const addProject = function (data: Project) {
  return request.post('/project', data);
};

export const editProject = function (data: Project) {
  return request.put('/project', data);
};

export const deleteProject = function (id) {
  return request.delete(`/project/${id}`);
};

export const getProject = function (id) {
  return request.get<never, Project>(`/project/${id}`);
};

export const getProjectList = function getProjectList(query = {}) {
  return request.get<never, Project[]>('/project/list', { params: query });
};

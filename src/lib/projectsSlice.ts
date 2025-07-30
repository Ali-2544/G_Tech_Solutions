import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  description: string;
  [key: string]: any;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [
    {
      id: '1',
      name: 'HealthTech Dashboard',
      description: 'A comprehensive healthcare management system with patient records, appointments, and analytics. Built with React, Node.js, and PostgreSQL.'
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      description: 'Modern e-commerce solution with advanced inventory management and payment processing. Features include real-time inventory tracking and secure payment gateways.'
    },
    {
      id: '3',
      name: 'Banking Mobile App',
      description: 'Secure mobile banking application with biometric authentication and real-time transactions. Built with React Native and integrated with banking APIs.'
    }
  ],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    editProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
  },
});

export const { addProject, editProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer; 
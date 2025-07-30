import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import projectsReducer from './projectsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    projects: projectsReducer,
  },
});

export default store; 
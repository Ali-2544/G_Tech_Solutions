import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      description: 'We\'re looking for a senior frontend developer to join our team and help build amazing user experiences. You\'ll work with React, TypeScript, and modern web technologies.',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      title: 'Backend Developer',
      description: 'Join our backend team to develop scalable APIs and microservices that power our applications. Experience with Node.js, Python, and cloud platforms required.',
      location: 'New York, NY'
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      description: 'Design intuitive and beautiful user interfaces for our web and mobile applications. You\'ll work with Figma, conduct user research, and create design systems.',
      location: 'Los Angeles, CA'
    }
  ],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    editJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
  },
});

export const { addJob, editJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer; 
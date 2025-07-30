import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, editJob, deleteJob } from '../lib/jobsSlice.js';
import { addProject, editProject, deleteProject } from '../lib/projectsSlice.js';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Briefcase, FolderOpen, Save, X } from 'lucide-react';

const Admin = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const projects = useSelector((state) => state.projects.projects);

  // Job form state
  const [jobForm, setJobForm] = useState({});
  const [editingJobId, setEditingJobId] = useState(null);

  // Project form state
  const [projectForm, setProjectForm] = useState({});
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Handlers for jobs
  const handleJobChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    if (editingJobId) {
      dispatch(editJob({ ...jobForm, id: editingJobId }));
      setEditingJobId(null);
    } else {
      dispatch(addJob({ ...jobForm, id: uuidv4() }));
    }
    setJobForm({});
  };

  const handleEditJob = (job) => {
    setJobForm(job);
    setEditingJobId(job.id);
  };

  const handleDeleteJob = (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(id));
    }
  };

  const handleCancelJob = () => {
    setEditingJobId(null);
    setJobForm({});
  };

  // Handlers for projects
  const handleProjectChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (editingProjectId) {
      dispatch(editProject({ ...projectForm, id: editingProjectId }));
      setEditingProjectId(null);
    } else {
      dispatch(addProject({ ...projectForm, id: uuidv4() }));
    }
    setProjectForm({});
  };

  const handleEditProject = (project) => {
    setProjectForm(project);
    setEditingProjectId(project.id);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  const handleCancelProject = () => {
    setEditingProjectId(null);
    setProjectForm({});
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage jobs and projects for your website</p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects ({projects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {/* Add/Edit Job Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editingJobId ? 'Edit Job' : 'Add New Job'}
                </CardTitle>
                <CardDescription>
                  {editingJobId ? 'Update the job details below' : 'Fill in the details to add a new job'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., Senior Frontend Developer"
                        value={jobForm.title || ''}
                        onChange={handleJobChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., San Francisco, CA"
                        value={jobForm.location || ''}
                        onChange={handleJobChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the job responsibilities and requirements..."
                      value={jobForm.description || ''}
                      onChange={handleJobChange}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {editingJobId ? 'Update Job' : 'Add Job'}
                    </Button>
                    {editingJobId && (
                      <Button type="button" variant="outline" onClick={handleCancelJob} className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Jobs List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Jobs</CardTitle>
                <CardDescription>
                  {jobs.length === 0 ? 'No jobs available. Add your first job above.' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} available`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <Badge variant="secondary">{job.location}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{job.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditJob(job)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteJob(job.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {/* Add/Edit Project Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </CardTitle>
                <CardDescription>
                  {editingProjectId ? 'Update the project details below' : 'Fill in the details to add a new project'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., E-commerce Platform"
                      value={projectForm.name || ''}
                      onChange={handleProjectChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the project and its features..."
                      value={projectForm.description || ''}
                      onChange={handleProjectChange}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {editingProjectId ? 'Update Project' : 'Add Project'}
                    </Button>
                    {editingProjectId && (
                      <Button type="button" variant="outline" onClick={handleCancelProject} className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Projects List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
                <CardDescription>
                  {projects.length === 0 ? 'No projects available. Add your first project above.' : `${projects.length} project${projects.length !== 1 ? 's' : ''} available`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                          <p className="text-muted-foreground text-sm">{project.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProject(project)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin; 
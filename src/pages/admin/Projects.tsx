import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import MediaUpload from '../../components/admin/MediaUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { Trash2, Plus } from 'lucide-react';
import { insertSampleProjects } from '../../lib/sampleData';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url?: string;
  technologies: string[];
  testimonial_text?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  live_url?: string;
  github_url?: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order');
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isEditing && currentProject.id) {
        const { error } = await supabase
          .from('projects')
          .update(currentProject)
          .eq('id', currentProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(currentProject);
        if (error) throw error;
      }

      setCurrentProject({});
      setIsEditing(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {projects.length === 0 && (
        <button
          onClick={async () => {
            try {
              await insertSampleProjects();
              fetchProjects();
            } catch (error) {
              console.error('Error adding sample projects:', error);
            }
          }}
          className="nav-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sample Projects
        </button>
      )}

      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={currentProject.title || ''}
              onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <RichTextEditor
              content={currentProject.description || ''}
              onChange={(content) => setCurrentProject(prev => ({ ...prev, description: content }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Image
            </label>
            <MediaUpload
              onUploadComplete={(url) => setCurrentProject(prev => ({ ...prev, image_url: url }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video URL (optional)
            </label>
            <input
              type="url"
              value={currentProject.video_url || ''}
              onChange={(e) => setCurrentProject(prev => ({ ...prev, video_url: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies
            </label>
            <input
              type="text"
              value={currentProject.technologies?.join(', ') || ''}
              onChange={(e) => setCurrentProject(prev => ({
                ...prev,
                technologies: e.target.value.split(',').map(t => t.trim())
              }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              placeholder="React, TypeScript, Tailwind CSS"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={currentProject.live_url || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, live_url: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={currentProject.github_url || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, github_url: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <button
              type="submit"
              className="nav-button"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
        <div className="space-y-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="flex items-center gap-4 bg-white/10 rounded-lg p-4"
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.technologies.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentProject(project);
                    setIsEditing(true);
                  }}
                  className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-white/5"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
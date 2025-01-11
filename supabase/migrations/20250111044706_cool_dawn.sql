/*
  # Create CMS tables

  1. New Tables
    - `carousel_images`: Stores carousel images with ordering
    - `projects`: Stores project information and portfolio items
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Create carousel_images table
CREATE TABLE IF NOT EXISTS carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  video_url text,
  technologies text[] NOT NULL DEFAULT '{}',
  testimonial_text text,
  testimonial_author text,
  testimonial_role text,
  live_url text,
  github_url text,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for carousel_images
CREATE POLICY "Public can view carousel_images"
  ON carousel_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage carousel_images"
  ON carousel_images
  USING (
    auth.role() = 'authenticated'
  );

-- Create policies for projects
CREATE POLICY "Public can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  USING (
    auth.role() = 'authenticated'
  );

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_carousel_images_updated_at
  BEFORE UPDATE ON carousel_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
/*
  # CMS Tables Setup

  1. New Tables
    - `carousel_images`
      - `id` (uuid, primary key)
      - `url` (text)
      - `alt` (text)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `video_url` (text, nullable)
      - `technologies` (text[])
      - `testimonial_text` (text)
      - `testimonial_author` (text)
      - `testimonial_role` (text)
      - `live_url` (text)
      - `github_url` (text)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users
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
CREATE POLICY "Allow public read access to carousel_images"
  ON carousel_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage carousel_images"
  ON carousel_images
  USING (auth.role() = 'authenticated');

-- Create policies for projects
CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  USING (auth.role() = 'authenticated');
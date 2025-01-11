/*
  # Enhanced CMS Tables Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text)
      - `role` (text)
      - `two_factor_enabled` (boolean)
      - `last_login` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `media_library`
      - `id` (uuid, primary key)
      - `file_name` (text)
      - `file_type` (text)
      - `file_size` (integer)
      - `url` (text)
      - `thumbnail_url` (text)
      - `alt_text` (text)
      - `category` (text)
      - `tags` (text[])
      - `uploaded_by` (uuid, references users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `content_revisions`
      - `id` (uuid, primary key)
      - `content_type` (text)
      - `content_id` (uuid)
      - `data` (jsonb)
      - `created_by` (uuid, references users)
      - `created_at` (timestamp)

    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `action` (text)
      - `entity_type` (text)
      - `entity_id` (uuid)
      - `changes` (jsonb)
      - `ip_address` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies based on user roles
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'contributor');
CREATE TYPE content_type AS ENUM ('project', 'carousel', 'media');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'login', 'logout');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'contributor',
  two_factor_enabled boolean NOT NULL DEFAULT false,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media_library table
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  url text NOT NULL,
  thumbnail_url text,
  alt_text text,
  category text,
  tags text[] DEFAULT '{}',
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_revisions table
CREATE TABLE IF NOT EXISTS content_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type content_type NOT NULL,
  content_id uuid NOT NULL,
  data jsonb NOT NULL,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action audit_action NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  changes jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
  ON users
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for media_library
CREATE POLICY "All authenticated users can view media"
  ON media_library
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload media"
  ON media_library
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own media"
  ON media_library
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Create policies for content_revisions
CREATE POLICY "All authenticated users can view revisions"
  ON content_revisions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create revisions"
  ON content_revisions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Create policies for audit_logs
CREATE POLICY "Admins can view all audit logs"
  ON audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_library_updated_at
  BEFORE UPDATE ON media_library
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
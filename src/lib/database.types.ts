export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      carousel_images: {
        Row: {
          id: string
          url: string
          alt: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          url: string
          alt: string
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          video_url: string | null
          technologies: string[]
          testimonial_text: string | null
          testimonial_author: string | null
          testimonial_role: string | null
          live_url: string | null
          github_url: string | null
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          video_url?: string | null
          technologies?: string[]
          testimonial_text?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          live_url?: string | null
          github_url?: string | null
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          video_url?: string | null
          technologies?: string[]
          testimonial_text?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          live_url?: string | null
          github_url?: string | null
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'editor' | 'contributor'
          two_factor_enabled: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'editor' | 'contributor'
          two_factor_enabled?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'editor' | 'contributor'
          two_factor_enabled?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
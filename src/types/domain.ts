export type ProjectType = 'link' | 'landing' | 'map' | 'design' | 'saas'
export type ProjectStatus = 'draft' | 'published' | 'archived'
export interface Project {
  id: string
  user_id: string
  type: ProjectType
  name: string
  slug: string
  status: ProjectStatus
  created_at: string
  updated_at: string
}
export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  status: 'active' | 'suspended'
  created_at: string
  updated_at: string
}

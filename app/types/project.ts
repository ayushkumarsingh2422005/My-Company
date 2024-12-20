export const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Backend Development',
  'Frontend Development',
  'Full Stack Development',
  'DevOps & Cloud',
  'AI & Machine Learning',
  'Data Science & Analytics',
  'Blockchain Development',
  'IoT Solutions',
  'API Development',
  'System Architecture',
  'Database Design',
  'UI/UX Design',
  'Technical Consulting',
  'Code Review & Optimization',
  'Security Solutions',
  'Testing & QA',
  'Other'
] as const;

export type ProjectCategory = typeof CATEGORIES[number];

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  tech: string[];
  link: string;
  category: ProjectCategory;
  domainId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} 
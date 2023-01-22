export interface Frontmatter {
  draft?: boolean;
  title: string;
  date: string;
  subtitle?: string;
  slug: string;
  minutesRead: string;
  tags?: string[];
}

export interface BlogPost {
  url?: string;
  title: string;
  date: string;
  minutesRead: string;
  tags: string[];
}

export interface ByYear {
  [year: string]: BlogPost[];
}

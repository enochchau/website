export interface BlogPost {
  id: string;
  url?: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export interface ByYear {
  [year: string]: BlogPost[];
}

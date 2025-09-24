export interface BlogPost {
  id: string;
  url?: string;
  title: string;
  date: string;
  readingTime: number;
  tags: string[];
}

export interface ByYear {
  [year: string]: BlogPost[];
}

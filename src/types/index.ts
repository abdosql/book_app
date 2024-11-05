export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface ReaderSettings {
  fontSize: number;
  isDarkMode: boolean;
}
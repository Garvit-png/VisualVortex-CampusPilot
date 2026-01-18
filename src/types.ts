
export interface Task {
  id: string;
  subject: string;
  type: 'Post Class' | 'In Class' | 'Pre Class';
  title: string;
  deadline: string;
  xpValue: number;
  solved: number;
  total: number;
  isDueTomorrow?: boolean;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  type: string;
  time: string;
  date: string;
  day: string;
}

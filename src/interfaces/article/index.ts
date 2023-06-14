import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  seo_optimized: boolean;
  video_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  video?: VideoInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  video_id?: string;
  user_id?: string;
}

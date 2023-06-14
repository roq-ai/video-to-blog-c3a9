import { ArticleInterface } from 'interfaces/article';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  youtube_url: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  article?: ArticleInterface[];
  organization?: OrganizationInterface;
  _count?: {
    article?: number;
  };
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  youtube_url?: string;
  organization_id?: string;
}

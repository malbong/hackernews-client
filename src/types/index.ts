import View from '../core/view';

export interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

export interface News {
  readonly id: number;
  readonly user: string;
  readonly time_ago: string;
  readonly content: string;
}

export interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  readonly title: string;
  read?: boolean;
}

export interface NewsDetail extends News {
  readonly title: string;
  readonly comments: NewsComment[];
}

export interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}

export interface RouteInfo {
  path: string;
  view: View;
}

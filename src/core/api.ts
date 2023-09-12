import { NewsFeed, NewsDetail } from '../types';

export class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  protected async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    return (await response.json()) as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  async getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  async getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}

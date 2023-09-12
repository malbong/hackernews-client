import { NewsFeed, NewsStore } from './types';

export default class Store implements NewsStore {
  private _currentPage: number;
  private feeds: NewsFeed[];

  constructor() {
    this._currentPage = 1;
    this.feeds = [];
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(pageNumber: number) {
    this._currentPage = pageNumber;
  }

  get nextPage(): number {
    return this._currentPage < 3 ? this._currentPage + 1 : 3;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }

  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeeds(): boolean {
    return this.feeds.length > 0;
  }

  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  setFeeds(feeds: NewsFeed[]): void {
    this.feeds = feeds.map((feed) => ({
      ...feed,
      read: false,
    }));
  }

  makeRead(id: number): void {
    this.feeds.forEach((feed: NewsFeed) => {
      if (feed.id === id) feed.read = true;
    });
  }
}

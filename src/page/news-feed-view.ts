import View from '../core/view';
import { NewsFeedApi } from '../core/api';
import { NewsFeed } from '../types';
import { NEWS_URL } from '../config';

const template = `
<div class="bg-gray-600 min-h-screen">
  <div class="bg-slate-50 flex justify-between px-4 py-6">
    <h1 class="text-2xl font-extrabold">Hacker News</h1>
    <nav class="flex items-center text-gray-600">
      <a href="#/page/{{__prev_page__}}">Previos</a>
      <a href="#/page/{{__next_page__}}" class="ml-5">Next</a>
    </nav>
  </div>
  <ul class="p-5">
    {{__news_feed__}}
  </ul>
</div>
`;

export default class NewsFeedView extends View {
  private api: NewsFeedApi;
  private feeds: NewsFeed[];

  constructor(containerId: string) {
    super(containerId, template);

    this.api = new NewsFeedApi(NEWS_URL);
    this.feeds = window.store.feeds;

    if (this.feeds.length === 0) {
      this.feeds = window.store.feeds = this.api.getData();
      this.makeFeeds();
    }
  }

  render(): void {
    window.store.currentPage = Number(location.hash.substring(7) || 1);

    for (let i = (window.store.currentPage - 1) * 10; i < window.store.currentPage * 10; ++i) {
      const { id, title, comments_count, user, points, time_ago, read } = this.feeds[i];
      this.addHtml(`
        <li class="mt-5 ${read ? 'bg-emerald-500' : 'bg-slate-50'} 
				p-6 rounded-lg hover:bg-emerald-500 transition-colors duration-300">
          <div class="flex justify-between">
            <div class="text-2xl flex-1">
              <a href="#/show/${id}">${title}</a>
            </div>
            <div class="w-10 bg-emerald-300 text-gray-600 rounded-lg text-center py-2 self-start">
              ${comments_count}
            </div>
          </div>
          <div class="flex mt-2 text-gray-600 text-sm">
            <div class="mr-5">
              <i class="fa-solid fa-user mr-1"></i>${user}
            </div>
            <div class="mr-5">
            <i class="fa-solid fa-heart mr-1"></i>${points}
            </div>
            <div class="mr-5">
            <i class="fa-solid fa-clock mr-1"></i>${time_ago}
            </div>
          </div>
        </li>
      `);
    }

    this.setTemplateData('news_feed', this.getHtml());
    this.setTemplateData(
      'prev_page',
      String(window.store.currentPage > 1 ? window.store.currentPage - 1 : 1)
    );
    this.setTemplateData(
      'next_page',
      String(window.store.currentPage < 3 ? window.store.currentPage + 1 : 3)
    );

    this.updateView();
  }

  private makeFeeds(): void {
    for (let i = 0; i < this.feeds.length; ++i) {
      this.feeds[i].read = false;
    }
  }
}

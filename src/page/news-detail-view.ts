import View from '../core/view';
import { NewsDetailApi } from '../core/api';
import { CONTENT_URL } from '../config';
import { NewsComment, NewsDetail, NewsStore } from '../types';

const template = `
  <div class="bg-gray-600 min-h-screen">
    <div class="bg-slate-50 flex justify-between px-4 py-6">
      <h1 class="text-2xl font-extrabold">Hacker News</h1>
      <nav class="flex items-center text-gray-600">
        <a href="#/page/{{__currentPage__}}"><i class="fa-solid fa-xmark"></i></a>
      </nav>
    </div>
    <div class="p-5">
      <div class="bg-slate-50 rounded-lg p-5 ">
        <div class="text-2xl h-40">
          {{__title__}}
        </div>
        <div>
          {{__news_comments__}}
        </div>
      </div>
    </div>
  </div>
`;

export default class NewsDetailView extends View {
  private store: NewsStore;

  constructor(containerId: string, store: NewsStore) {
    super(containerId, template);
    this.store = store;
  }

  async render(): Promise<void> {
    const id = location.hash.substring(7);
    const api = new NewsDetailApi(CONTENT_URL.replace('@ID', id));

    const newsContent: NewsDetail = await api.getData();

    this.store.makeRead(Number(id));

    this.setTemplateData('currentPage', String(this.store.currentPage));
    this.setTemplateData('title', newsContent.title);
    this.setTemplateData('news_comments', this.makeComments(newsContent.comments));

    this.updateView();
  }

  private makeComments(comments: NewsComment[]): string {
    comments.forEach((comment) => {
      this.addHtml(`
        <div class="ml-${8 * comment.level} mt-4">
          <div class="text-gray-400 mb-1">
            <i class="fa-solid fa-comment"></i>
            <span class="font-extrabold">${comment.user}</span>
            <span>${comment.time_ago}</span>
          </div>
          <div>
            ${comment.content}
          </div>
        </div>
      `);
      if (comment.comments.length > 0) {
        this.addHtml(this.makeComments(comment.comments));
      }
    });

    return this.getHtml();
  }
}

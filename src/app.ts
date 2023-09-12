import Router from './core/router';
import { Store } from './types';
import { NewsFeedView, NewsDetailView } from './page';

const store: Store = {
  currentPage: 1,
  feeds: [],
};

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView);

router.addRouteList('/page/', newsFeedView);
router.addRouteList('/show/', newsDetailView);

router.route();

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  app.router.afterEach(() => {
    NProgress.done();
  });
}
import * as Koa from "koa";
import * as mongoose from 'mongoose';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';

// controllers
import * as homeController from './controller/home'
import * as movieController from './controller/movie'

const app = new Koa();
const router = new Router();

app.use(koaBody({
  // encoding: 'gzip',
}));

// 全局设置
/* app.use((ctx, next) => {
  // ctx.set('Content-Type', 'application/json');
  // ctx.type = 'application/json';
  next();
}) */

mongoose.connect('mongodb://localhost:27017/douban', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  // ready to use...
  console.log('MongoDB connect success!');
}).catch(err => {
  console.log(`MongoDB connection error: ${err}.`)
});

app.context.port = process.env.PORT || 3000;
app.context.env = process.env.NODE_ENV;


router.get('/', homeController.getHomeMovie);

router.get('/movie/rank', movieController.getSidebarRank)
      .get('/movie/subject/:id', movieController.getMovie)
      .get('/movie/subject/:id/celebrities', movieController.getCelebrities)
      .get('/movie/top250', movieController.getTop250)

app.use(router.routes());
app.use(router.allowedMethods());

export default app;

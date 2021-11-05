import app from './app';

if (process.env.NODE_ENV === 'development') {

}

const server = app.listen(app.context.port, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
      app.context.port,
      app.context.env
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;

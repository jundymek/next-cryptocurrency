import Hapi from "@hapi/hapi";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3001,
  host: process.env.HOST || "localhost",
});

export async function start(): Promise<Hapi.Server> {
  await server.start();
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start()
  .then((server) => {
    console.log(`Server running on ${server.info.uri}`);
  })
  .catch((err) => {
    console.log(err);
  });
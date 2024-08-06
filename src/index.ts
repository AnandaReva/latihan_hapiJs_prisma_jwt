import Hapi from "@hapi/hapi";
import { checkApiKey } from "./middlewares/apiKeyMiddleware";
import userRoutes from "./routes/userRoutes";
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register the API key middleware plugin
  await server.register(checkApiKey);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello, Hapi.js with TypeScript!";
    },
  });

  // Register user routes
  server.route(userRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

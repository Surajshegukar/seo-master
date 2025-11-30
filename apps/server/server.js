const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const prisma = require("../server/config/prisma.js");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const dev = process.env.NODE_ENV !== "production";
const nextAppPath = path.join(__dirname, "../website");
const routes = require("./config/routes.js");


let next;

try {
  next = require("next");
} catch (err) {
  console.error(
    "Cannot find Next.js! Make sure it's installed in apps/web and run 'npm install' from monorepo root."
  );
  process.exit(1);
}

if (!dev) {
  const app = next({ dev, dir: nextAppPath }); // <-- fixed variable name
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = express();
    server.use("/api2", express.json());
    server.use("/api2", express.urlencoded({ extended: true }));
    server.use("/api2", cookieParser());
    server.use("/api2", 
      cors({
        origin: [process.env.NEXT_PUBLIC_APP_URL],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );

    // Prisma middleware
    server.use("/api2",(req, res, next) => {
      req.prisma = prisma;
      next();
    });
    server.use("/api2",routes);
    server.use((req, res, next) => {  
      // Otherwise, let Next.js handle it
      return handle(req, res);
    });


    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const app = express();
  const port = process.env.PORT || 3000;
  const routes = require("./config/routes.js");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  // Prisma middleware
  app.use((req, res, next) => {
    req.prisma = prisma;
    next();
  });
  // Use the routes
  app.use("/api2", routes);

  app.get("/", (req, res) => {
    res.send(`
      <html>
        <head><title>Express Server</title></head>
        <body>
          <p>Server is running on port ${port}</p>
          <p>Access the API at <a href="/api">/api</a></p>
          <p>Access the admin panel at <a href="/admin">/admin</a></p>
          <p>Access the frontend at <a href="${process.env.NEXT_PUBLIC_APP_URL}">${process.env.NEXT_PUBLIC_APP_URL}</a></p>

        </body>
      </html>
    `);
  });

  app.listen(port, () => {
    console.log(
      `🚀 Server running on http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
  });
}


import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { specifiedRules } from "graphql";
import cors from "cors"; // For handling CORS
import morgan from "morgan"; // For logging
import helmet from "helmet"; // For security headers
import rateLimit from "express-rate-limit"; // For rate limiting
import characterSchema from "./models/characterModel.js";
import spellSchema from "./models/spellModel.js";
import creatureSchema from "./models/creatureModel.js";
import resolvers from "./models/resolvers.js";
import { validateFriendEnemyCharacterFields } from "./validationRules.js";

import characterRoutes from "./routes/characterRoutes.js";
import spellRoutes from "./routes/spellRoutes.js";
import creatureRoutes from "./routes/creatureRoutes.js";

const typeDefs = `
  ${characterSchema}
  ${spellSchema}
  ${creatureSchema}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
};

// Request validation middleware
const validateRequest = (req, res, next) => {
  // Validate Content-Type for POST and PUT requests
  if (
    (req.method === "POST" || req.method === "PUT") &&
    !req.is("application/json")
  ) {
    return res
      .status(415)
      .json({ error: "Content-Type must be application/json" });
  }
  next();
};

// Logging middleware for debugging
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Request logging
app.use(express.json({ limit: "10mb" })); // Body parsing with size limit
app.use(express.urlencoded({ extended: true }));
app.use(limiter); // Rate limiting
app.use(requestLogger); // Custom request logging
app.use(validateRequest); // Request validation

app.use("/characters", characterRoutes);
app.use("/spells", spellRoutes);
app.use("/creatures", creatureRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    validationRules: [...specifiedRules, validateFriendEnemyCharacterFields],
  })
);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

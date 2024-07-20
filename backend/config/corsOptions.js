const { allowedOringins } = require("./allowedOrigins.js");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOringins.indexOf(origin) == -1) {
      return callback(null, true);
    } else {
      return callback("Origin not allowed by cor", false);
    }
  },

  Credential: true,
  optionSuccessStatus: 200,
  methods: "GET, PATCH, DELETE, POST",
  allowedHeaders: ["Content-Type", "Authorization"],
  "Access-Control-Allow-Credentials": true,
};

module.exports = { corsOptions };

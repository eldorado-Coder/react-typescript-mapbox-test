import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
// @ts-ignore TODO figure this out
import webpackConfig from "../webpack.config.dev";
import api from "./api";

const PORT = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);
const app = express();

var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(webpackMiddleware(compiler));

app.use("/api", api);

app.get("*", app.use(express.static("public")));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port `, PORT);
});

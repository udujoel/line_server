const FILENAME = process.argv[2]; //get the name of the file from the command line
if (!FILENAME) {
  console.error("Please provide a file name");
  process.exit(1);
}
// import dependencies
const express = require("express");
const fs = require("fs");
const readline = require("readline");
const NodeCache = require("node-cache");
const cache = new NodeCache();

// initialize express
const app = express();

// define route handler for 'GET /lines/<line index>' endpoint
app.get("/lines/:index", async (req, res) => {
  const index = parseInt(req.params.index, 10); // Convert index to integer
  if (isNaN(index)) {
    res.status(400).send("Line index must be an integer");
    return;
  } // ensure index is an integer
  if (index < 0) {
    res.status(400).send("Line index must be positive");
    return;
  } // ensure index is positive

  // Check the cache
  const cachedValue = cache.get(index.toString());
  if (cachedValue !== undefined) {
    res.status(200).send(cachedValue);
    return;
  }

  const fileStream = fs.createReadStream(FILENAME);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // serve the requested line

  let lineNumber = 0;
  for await (const line of rl) {
    if (lineNumber === index) {
      cache.set(index.toString(), line); // Store the line in the cache for future requests.
      res.status(200).send(line);
      return;
    }
    lineNumber++;
  }
  res.status(413).send("Requested line is beyond the end of the file");
  rl.close();
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

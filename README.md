# Line Server System

## How does your system work? (if not addressed in comments in source)

This system serves individual lines from a specified text file to clients over HTTP, using a simple REST API. Clients can request a specific line by sending an HTTP GET request to the `/lines/<line index>` endpoint.

- The system utilizes Express.js to create a web server that listens for incoming requests on port 3000.
- A simple caching mechanism is implemented using the `node-cache` module to store recently accessed lines in memory.
- The system reads through the specified file sequentially to find the requested line, leveraging the Node.js `readline` and `fs` modules.
 

## How will your system perform with a 1 GB file? a 10 GB file? a 100 GB file?

The cache will help to improve performance for frequently accessed lines but memory usage of the cache will increase as the file size increases. This may become a problem for very large files, or for servers with limited memory. The time it takes to read the file from disk will increase as the file size increases too.
- **1 GB File**: The system should perform reasonably well with a 1 GB file, although performance may degrade if many unique lines are requested due to the lack of random access.
- **10 GB File**: Performance will likely degrade with a 10 GB file, especially as the file needs to be read sequentially.
- **100 GB File**: Performance with a 100 GB file may be significantly impacted, and the system may struggle to serve lines in a timely manner.


## How will your system perform with 100 users? 10000 users? 1000000 users?

The system will be able to handle a large number of concurrent users. The Express framework is designed to scale well, and the Node.js runtime is very efficient at handling multiple concurrent requests.
- **100 Users**: The system should handle 100 simultaneous users fairly well.
- **10,000 Users**: Performance may degrade with 10,000 simultaneous users, especially if many unique lines are requested.
- **1,000,000 Users**: The system is likely to struggle without some further optimisation and scaling.


## What documentation, websites, papers, etc did you consult in doing this assignment?

- Express.js Documentation: [Express.js](https://expressjs.com/)
- Node.js Documentation: [Node.js Docs](https://nodejs.org/dist/latest-v14.x/docs/api/)
- Readline documentation: [Readline](https://docs.python.org/3/library/readline.html)
- `node-cache` Documentation: [node-cache on npm](https://www.npmjs.com/package/node-cache)


## What third-party libraries or other tools does the system use? How did you choose each library or framework you used?

- Express: I chose Express because it is a popular and well-supported web framework for Node.js.
- NodeCache: I chose NodeCache because it is a simple and efficient in-memory cache. This is useful for caching frequently accessed lines of the file.

## How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?

- The exercise took approximately 3 and half hours to complete.
- With unlimited time, priority would be given to implementing random access for more efficient line retrieval, optimizing the caching mechanism, and improving error handling.
- Further time would also be spent on load testing, performance analysis, and possibly porting the system to a more performant language or runtime.
- I could also add support for authentication and authorization. Currently, anyone can access the server. I would like to add support for authentication and authorization so that only authorized users can access the server.


## If you were to critique your code, what would you have to say about it?


- The current implementation reads the file sequentially which is inefficient for large files.
- The caching mechanism is simplistic and may not handle a high volume of unique requests efficiently.
- Error handling and logging are minimal and could be improved for a production environment.
- The system lacks tests, which would be crucial for ensuring correctness and robustness in a real-world scenario.


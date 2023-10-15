#!/bin/bash

# Check if a filename was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

# Assign the filename to a variable
FILENAME=$1

# Start the server with the specified filename
node src/server.js "$FILENAME"

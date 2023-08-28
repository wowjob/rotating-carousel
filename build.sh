#!/bin/bash

# Set source and target directories
SOURCE_DIR="./dist/assets"
TARGET_DIR="./public/js"

# Look for files that match the pattern in the source directory
for src_file in $SOURCE_DIR/index-*.js; do
    # Check if file exists and is a regular file (to avoid directory issues)
    if [[ -f $src_file ]]; then
        # Copy the contents of the file to the target file
        cat $src_file > $TARGET_DIR/rotating-carousel.js

        # Optional: Print a message to indicate success
        echo "Contents of $src_file have been copied to $TARGET_DIR/rotating-carousel.js"
    fi
done

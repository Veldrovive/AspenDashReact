#!/bin/bash -ex

echo "Running from $(pwd)"

# Setup git so we can use it
git config user.name "CircleCI Deploy script"
git config user.email "autodeploy@circle.ci"

# Reset Everything
git checkout -f
git checkout master

git fetch origin master
git reset --hard origin/master

# Move .gitignore out of the way so we can add build/
mv '.gitignore' '.gitignore.bak'
git add build/

# Commit and push
git commit -m "Automated React Static build from CircleCI"
git subtree push --prefix build origin gh-pages

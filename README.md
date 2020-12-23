The original readme file hosted [here](https://github.com/ericalli/static-site-boilerplate)

# Development

Requirements: node js < 13 version (dev env was node 12.6.0)

```
git clone
npm install
npm start
```

# Build

```
npm run build:dist
```

`dist` folder will be added to the repository with all necessary files

# Deployment

Just copy and paste files from dist folder to any file server, for example an article of how to do this with [Amazon S3](https://medium.com/@kyle.galbraith/how-to-host-a-website-on-s3-without-getting-lost-in-the-sea-e2b82aa6cd38)

# To toggle projects section

To enable the carousel with projects: at every file `index.html`, `projects.html`, `about.html` there is a `script` tag right before closing `</head>` - switch `window.projectsEnabled` from `false` to `true`
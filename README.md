# Messenger

### Instructions
Use `npm run start` to run app locally at http://localhost:4000.

App is available for preview on [Netlify](https://pensive-austin-8ea525.netlify.app/).

App UI/UX prototype is available on [Figma](https://www.figma.com/file/MryUh4UNG7Cpk8bUMGshvN/Praktikum-Messenger?node-id=0%3A1).

You can check components life cycle by visiting a small demo - page [Error 500](https://pensive-austin-8ea525.netlify.app/500/).

### Folder structure explained
    .
    ├── README.md                  This file
    ├── src                        Contains source files (TypeScript)
    │   └── aseets            
    │       └── js            
    │           ├── components     Components - elements
    │           ├── modules        Helpers, Block, Event Bus, etc.
    │           └── pages          Components - pages 
    ├── static                     Contains static files
    │   ├── assets                 Folder containing CSS, compiled JavaScript and images
    │   ├── register               (Example) - page folder, containing HTML and JavaScript 
    │   └── index.html             JS to render the dynamic portions of the app
    ├── index.js                   Main file
    ├── netlify.toml               Netlify continuous deployment settings
    └── package.json               Contains app description, dependencies and configuration information

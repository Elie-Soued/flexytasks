### Flexytasks

**Flexytasks** is the frontend of a full-stack Todo application.

##### Overview

This project is built with **Angular** for the frontend and communicates with a **Node.js + Express** backend.  
It is deployed on **Hetzner** and uses **GitHub Actions** for continuous integration.

##### Development

To start the development server:

```bash
ng serve

```

Open your browser at http://localhost:4200/ to see the app. The application will automatically reload when source files are modified.  


##### Build

```bash
ng build

```



##### Testing
Unit Tests
Run unit tests using Karma:

```bash
ng test

```

##### Continuous Integration
This project is integrated with GitHub Actions for CI.  
Whenever changes are pushed, automated workflows are triggered to build and test the application.  

##### Deployment
The application is deployed on a Hetzner server.
Build artifacts from the CI pipeline can be deployed automatically or manually to the production environment.

##### Backend
The backend is a separate service built using Node.js and Express, responsible for handling API requests and persisting todo items.



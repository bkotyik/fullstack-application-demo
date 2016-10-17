Application Portal  - *Full stack javascript application using Angular 2 and NodeJS*
=======

## Backend##
**Features**
 - Built in NodeJS using [ExpressJS](http://expressjs.com)
 - Models are validated by [Joi](https://github.com/hapijs/joi)
 - Used [YARN](https://yarnpkg.com) as package manager
 - Deployment with [Docker](http://docker.com)
 - Written in [TypeScript 2.0](https://www.typescriptlang.org/docs/release-notes/typescript-2.0.html)
 - Static code analysis using [TsLint](https://github.com/palantir/tslint)
 - Unit tests for middlewares and models using [Mocha](https://mochajs.org), [Sinon](http://sinonjs.org) and [Chai](http://chaijs.com)
 - Integration tests for API endpoints with [supertest](https://github.com/visionmedia/supertest)
 - [Istanbul](https://github.com/gotwarlost/istanbul) for code coverage measurements

**Installation**

 1. Clone this repository
 2. Enter into the 'backend' directory
 3. Install yarn
`npm install -g yarn`
 4. Enter to the cloned directory and install the dependencies
 `yarn install` (or alternatively you can use npm as well)
 5. Build the applicatioin
	`npm run build`
 6. Start it!
`npm run start`

**Using Docker for deployment**
First create a build, then just hit `npm run docker-build` to create the docker image. 
When it's done you can easily start the container with the following command: `docker run -p 3000:3000 bkotyik/fullstack-backend`
Not that in this case the port 3000 of the container will be forwarded to your machine. 
So the backend will be available at `http://localhost:3000`

**Running the tests**
Tests can be run by executing `npm run test`. The command will run both unit and integration tests.
If you want to check the code coverage just hit `npm run coverage`

**API Endpoints**
The application exposes three endpoints:
 1. **POST /users**: Accepts a JSON formatted document which will be handled as a user model. If valid, a success message will be sent back to the client. Else the validation errors will be shown in the response
 2.  **GET /users/metadata**: Publicates the metadata of the User model, so that the frontend will be able to use the backend's validation rules.
 3.  **GET /occupations**: Gives a list of pre-defined occupations.

**Design decisions**

 - For the sake of simplicity, every middleware can terminate the pipeline. Basically its not a good practice, because makes the control flow unpredictable. But because this demo has only 3 middlewares and one of the is the error handler middleware, I deciced to keep my implementation simple and give the ability for those two middlewares to handle the output instead of delegating this task for a dedicated middleware.

----------

## Frontend##

**Features**

 - Built with [Angular 2.1](https://angular.io) and [ng-bootstrap](http://ng-bootstrap.github.io) which relies[Bootstrap 4](http://v4-alpha.getbootstrap.com)
 - Bundled using [Webpack 2](https://github.com/webpack/webpack)
 - Unit tested using [Jasmine](http://http://jasmine.github.io) and E2E tested using [Protractor](http://www.protractortest.org/)
 - Uses validation metadata exposed by backend
  
 **Installation**
 
 1. Clone this repository
 2. Enter into the 'frontend' directory
 3. Install yarn
`npm install -g yarn`
 4. Enter to the cloned directory and install the dependencies
 `yarn install` (or alternatively you can use npm as well)
 5. Build the applicatioin
	`npm run build`
 6. Start it!
`npm run start`

**Using Docker for deployment**
First create a build, then just hit `npm run docker-build` to create the docker image. 
When it's done you can easily start the container with the following command: `docker run -p 8080:8080 bkotyik/fullstack-frontend`
Not that in this case **the port 8080 of the container will be forwarded to your machine**. 
So the frontend will be available at `http://localhost:8080`

**Running the tests**
Tests can be run by executing `npm run test`. The command **will run only unit** tests.
In order to be able to run E2E, start an instance from both the frontend and the backend, and execute
`npm run e2e` from command line.
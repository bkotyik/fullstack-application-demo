Application Portal  - *Full stack javascript application using Angular 2 and NodeJS*
=======
## Common prerequisities ##
I would rather you installed the following packages globally on your local computer due to the build processes are heavily relaying on them:
 - Rimraf: `npm install -g rimraf`
 - Typescript 2: `npm install -g ts`
 - Mocha: `npm install -g mocha`
 - Istanbul: `npm install -g istanbul`

----------

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
 3. Install yarn package manager globally
`npm install -g yarn`
 4. Make sure you are in the 'backend' directory where the package.json locates. Install all the backend dependencies:
 `yarn install` (or alternatively you can use npm as well, but I provided lock files only for yarn)
 5. Build the application
	`npm run build`
 6. Start it!
`npm run start`

**Configuration**
The backend comes with a default built-in configuration which can be easily overridden by copying 'src/config.json.dist' into the dist/ folder. Dont forget to rename it to 'config.json'; After that when the backend starts up it will use the configuration from config.json.
By default the backend uses tcp:3000 port and allows cross domain request only from localhost:8080.

**Using Docker for deployment**
First create a build (by running `npm run build`), then just hit `npm run docker-build` to create the docker image. 
When it's done you can easily start the container with the following command: `docker run -p 3000:3000 bkotyik/fullstack-backend`
Note that in this case the port number 3000 of the container will be forwarded to your machine. 
So the service will be available at `http://localhost:3000`

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
 - Production build using Angular 2 [AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)
  
 **Installation**
 
 1. Clone this repository
 2. Enter into the 'frontend' directory
 3. Install yarn package manager globally
`npm install -g yarn`
 4. Make sure you are in the 'frontend' directory where the package.json locates. Install all the backend dependencies:
 `yarn install` (or alternatively you can use npm as well, but I provided lock files only for yarn)
 5. Build the application and create a docker container from the output
	`npm run build` creates a build into the 'dist' directory and `npm run docker-build` makes a container from that. 
 6. Or start it in development mode by running `npm run start`

 **Configuration**
  The frontend comes with a default built-in configuration which can be easily overridden by editing the config.js file under the dist/ folder. 
  By default the frontend will be served via the tcp:8080 port and expects the backend to be available at the http://localhost:3000 address.


**Using Docker for deployment**
First create a build, then just hit `npm run docker-build` to create the docker image. 
When it's done you can easily start the container with the following command: `docker run -p 8080:8080 bkotyik/fullstack-frontend`
Not that in this case **the port 8080 of the container will be forwarded to your machine**. 
So the frontend will be available at `http://localhost:8080`

**Running the tests**
Tests can be run by executing `npm run test`. The command **will run only unit** tests.
In order to be able to run E2E, first update your chrome webdriver by executing the following line in a command prompt: `npm run webdriver-update`
After that start an instance from both the frontend and the backend, and execute `npm run e2e` from the command line.
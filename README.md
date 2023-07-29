# Interview Scheduler

## Description 

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be scheduled between 12 PM and 5 PM, Monday to Friday. Each appointment consists of one student and one interviewer. Users can create, edit, and delete appointments. The front end of this project is built with React and interacts with an API to fetch and store appointment data from a database.

## Demo

### Saving Interview
![Saving Appointment](https://github.com/x-saim/scheduler/blob/master/docs/SaveInterview.gif?raw=true)

### Editing Interview
![Editing Appointment](https://github.com/x-saim/scheduler/blob/master/docs/EditInterview.gif?raw=true)

### Deleting Interview
![Deleting Appointment](https://github.com/x-saim/scheduler/blob/master/docs/DeleteInterview.gif?raw=true)

### Error Handling - Saving Appointment
![Saving Error](https://github.com/x-saim/scheduler/blob/master/docs/SaveError.gif?raw=true)

### Error Handling - Deleting Appointment
![Deleting Error](https://github.com/x-saim/scheduler/blob/master/docs/DeleteError.gif?raw=true)


## Setup

Install dependencies with `npm install`.

### Set up API
To ensure proper functionality, the Scheduler application relies on the scheduler-api database to be installed and operational concurrently.

To get started, please perform the following steps:

1. Fork and clone the scheduler-api server repository from this [location](https://github.com/lighthouse-labs/scheduler-api).
2. Follow the guidelines outlined in the scheduler-api README file to install the necessary database.
3. Launch the scheduler-api server by navigating to the cloned folder and executing the command `npm start`.

### Running Webpack Development Server

```sh
npm start
```

### Running API Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress
Ensure the API server is in test mode by running `npm run test:server`. Then execute the following to run cypress, from the main scheduler project directory.

```sh
npm run cypress
```

### Resetting Database

```sh
curl http://localhost:8001/api/debug/reset
```
Alternatively, you can visit `http://localhost:8001/api/debug/reset` in your browser.


## Dependencies 

- "axios": "^0.20.0",
- "classnames": "^2.2.6",
- "normalize.css": "^8.0.1",
- "react": "^16.9.0",
- "react-dom": "^16.9.0",
- "react-scripts": "3.4.4"

## Dev Dependencies
- babel/core: ^7.4.3
- storybook/addon-actions": "^5.0.10",
- storybook/addon-backgrounds": "^5.0.10",
- storybook/addon-links": "^5.0.10",
- storybook/addons": "^5.0.10",
- storybook/react: ^5.0.10
- testing-library/jest-dom: ^4.0.0
- testing-library/react: ^8.0.7
- testing-library/react-hooks: ^8.0.1
- babel-loader: 8.1.0
- prop-types: ^15.8.1
- react-test-renderer: ^16.9.0
- sass: ^1.53.0

## Other Tools
- cypress@9.7.0

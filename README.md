# Interview Scheduler

## Description 

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be scheduled between 12 PM and 5 PM, Monday to Friday. Each appointment consists of one student and one interviewer. Users can create, edit, and delete appointments. The front end of this project is built with React and interacts with an API to fetch and store appointment data from a database.

## Dependencies
- babel/core: ^7.4.3
- storybook/react: ^5.0.10
- testing-library/jest-dom: ^4.0.0
- testing-library/react: ^8.0.7
- testing-library/react-hooks: ^8.0.1
- babel-loader: 8.1.0
- prop-types: ^15.8.1
- react-test-renderer: ^16.14.0
- sass: ^1.53.0

## Demo

![Saving Appointment](image-url)
![Editing Appointment](image-url)
![Deleting Appointment](image-url)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Resetting Database

```sh
curl http://localhost:8001/api/debug/reset
```
Alternatively, you can visit `http://localhost:8001/api/debug/reset` in your browser.
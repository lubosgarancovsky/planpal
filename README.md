# PlanPal

PlanPal is a React project bootstrapped with [Vite](https://vitejs.dev/). It is a todo application that uses [mockapi.io](https://mockapi.io) to manage users tasks.

## Table of Contents

- [PlanPal](#planpal)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone the reposiory](#clone-the-reposiory)
    - [Setup mockapi.io project](#setup-mockapiio-project)
    - [Setup the environment variables](#setup-the-environment-variables)
    - [Run the application](#run-the-application)

## Installation

### Clone the reposiory

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/lubosgarancovsky/planpal.git
cd planpal
npm install
```

### Setup mockapi.io project

Now visit the [mockapi.io](https://mockapi.io) website, log in and create a new project.
Choose the name of the project and the API prefix (for example: `/api/v1`).

Create new resource by clicking on the `New resource` button and create a schema by following this example:

| Name        | Type      |
| ----------- | --------- |
| id          | Object ID |
| title       | String    |
| desciprtion | String    |
| priority    | Number    |
| tags        | Array     |
| createdAt   | String    |
| dueAt       | String    |
| isDone      | Boolean   |

### Setup the environment variables

Inside .env file there are two environment variables: <br/>

- `VITE_PROJECT_SECRET` <br/>
- `VITE_PROJECT_API_PREFIX` <br/>

Copy the blue part of your [mockapi.io](https://mockapi.io) API endpoint (Project secret) into `VITE_PROJECT_SECRET` and copy the purple part ( API prefix ) into `VITE_PROJECT_API_PREFIX`.

```bash
VITE_PROJECT_SECRET=
VITE_PROJECT_API_PREFIX=
```

### Run the application

To run the React application use the command:

```bash
npm run dev
```

or host the application on your local network with

```bash
npm run dev-host
```

Visit http://localhost:5173/

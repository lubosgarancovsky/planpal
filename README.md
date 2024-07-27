# PlanPal

[PlanPal](https://lubosgarancovsky.github.io/planpal/) is a React project bootstrapped with [Vite](https://vitejs.dev/). It is a todo application that uses [mockapi.io](https://mockapi.io) to manage users tasks.

## Table of Contents

- [PlanPal](#planpal)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Clone the repository](#clone-the-repository)
    - [Setup mockapi.io project](#setup-mockapiio-project)
    - [Setup the environment variables](#setup-the-environment-variables)
    - [Run the application](#run-the-application)
  - [Features](#features)
    - [List of Tasks](#list-of-tasks)
    - [Tags](#tags)
    - [Due Date](#due-date)
    - [Priority](#priority)
    - [Editing](#editing)
    - [Import/Export](#importexport)
    - [Responsivity](#responsivity)
    - [Dark mode](#dark-mode)
  - [Visit](#visit)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager)
- npm

### Clone the repository

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

Visit http://localhost:5173/ to see the application running.

## Features

### List of Tasks

- Manage your tasks in a list view.
- Each task includes relevant details such as title, description, and status.
- Tasks can be marked as completed, reprioritized, edited and deleted

### Tags

- Organize tasks with custom tags.
- Tags help to categorize the tasks.

### Due Date

- Set due dates for tasks to keep track of deadlines.
- Due dates help prioritize tasks and manage time effectively.

### Priority

Every task can be assigned a priority to differentiate between more and less important tasks:

- **Low** (green): Tasks that are less urgent.
- **Medium** (yellow): Tasks that require moderate attention.
- **High** (red): Tasks that are of high importance and need immediate action.

### Editing

- Tasks are edited in the side panel after being opened from the list
- Title and description becomes editable by double clicking
- Changes made inside a side panel need to be saved by the button in the footer

### Import/Export

- **Export**: Allows users to export their tasks data into a JSON file. This feature is useful for backing up data or transferring it to another instance.
- **Import**: Users can import their tasks from a JSON file back into the application. This feature enables easy restoration of tasks and data migration.

### Responsivity

- Application is optimalized for mobile devices

### Dark mode

Application has two color modes, one of them is initially enabled based on the preferrence of the browser. Color mode can later be changed using the button in the header.

- Light
- Dark

## Visit

Visit hosted application [here](https://lubosgarancovsky.github.io/planpal/).

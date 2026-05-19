# ZLI-Modul-109-Counter-app (Demo React and NodeJS app)

> This is a ReadMe for the deployment and configuration of the counter-app based on React and NodeJS.

---

### Table of Contents

- [Scope](#scope)
- [Design](#design)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Deployment](#deployment)
- [How to Use](#howtouse)
- [References](#references)

## Scope
The goal was to create a dynamic counter app to replace the current paper-heavy counting tasks. The application must be able to run on mobile devices and be intuitive.

[Back To The Top](#zli-modul-109-counter-app-demo-react-and-nodejs-app)

## Design

### Frontend
- [Additional Information](./docs/FRONTEND.md)

The frontend is built using React in combination with Material Design to create an intuitive UI.

![UseCaseView](docs/usecaseView.PNG)
![ExecutionOfMeasurements](docs/ExecutionOfMeasurementsView.PNG)
![MeasurementsView](docs/measurementsView.PNG)

[Back To The Top](#zli-modul-109-counter-app-demo-react-and-nodejs-app)

### Backend
- [Additional Information](./docs/BACKEND.md)

The backend API is developed using Node.js with PostgreSQL as the persistent datastore.

[Back To The Top](#zli-modul-109-counter-app-demo-react-and-nodejs-app)

## Deployment
- [Additional Information](./docs/DEPLOY.md)

The backend and frontend are combined in this project. To control the behavior of the application during runtime, the following environment variables can be set:

| Variable Name             | Description                                                       |
|---------------------------|-------------------------------------------------------------------|
| `POSTGRES_USER`           | Username for the PostgreSQL database                              |
| `POSTGRES_PASSWORD`       | Password for the PostgreSQL database                              |
| `POSTGRES_DATABASE`       | Name of the PostgreSQL database                                   |
| `DB_USER`                 | Database user, sourced from `counter-database` secret             |
| `DB_NAME`                 | Database name, sourced from `counter-database` secret             |
| `DB_PASSWORD`             | Database password, sourced from `counter-database` secret         |
| `DB_HOST`                 | Database host, sourced from `counter-config` ConfigMap            |
| `BACKEND_URL`             | Backend URL, sourced from `counter-config` ConfigMap              |
| `NODE_ENV`                | Node.js environment setting (e.g., `development`, `production`)   |

[Back To The Top](#counter-app)

## References

- [How to fork](./docs/HOW_TO_FORK.md)

[Back To The Top](#zli-modul-109-counter-app-demo-react-and-nodejs-app)
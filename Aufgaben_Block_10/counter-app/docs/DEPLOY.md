# Deployment Guide

> This document provides step-by-step instructions for building, pushing, and deploying the frontend and backend of the counter app using Docker and GitHub.

---

### Table of Contents

- [GitHub Login with Personal Access Token](#github-login-with-personal-access-token)
- [Build and Push Docker Images](#build-and-push-docker-images)
  - [Build and Push Frontend](#build-and-push-frontend)
  - [Build and Push Backend](#build-and-push-backend)
- [Set GitHub Packages Visibility](#set-github-packages-visibility)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)

## GitHub Login with Personal Access Token

1. Go to GitHub settings and create a Personal Access Token (PAT) with the required permissions.

2. Log in to Docker with your GitHub username and the created Personal Access Token:

    ```html
    docker login ghcr.io
    ```

    - Use your GitHub username as the `Username`.
    - Use the Personal Access Token as the `Password`.

[Back To The Top](#deployment-guide)

## Build and Push Docker Images

### Build and Push Frontend

1. Build the frontend Docker image:

    ```html
    docker build -f Dockerfile.frontend -t ghcr.io/<githubusername>/counter-frontend .
    ```

2. Push the frontend Docker image to GitHub Container Registry:

    ```html
    docker push ghcr.io/<githubusername>/counter-frontend
    ```

[Back To The Top](#deployment-guide)

### Build and Push Backend

1. Build the backend Docker image:

    ```html
    docker build -f Dockerfile.backend -t ghcr.io/<githubusername>/counter-backend .
    ```

2. Push the backend Docker image to GitHub Container Registry:

    ```html
    docker push ghcr.io/<githubusername>/counter-backend
    ```

[Back To The Top](#deployment-guide)

## Set GitHub Packages Visibility

Go to GitHub and set the visibility of the `counter-frontend` and `counter-backend` packages from "Private" to "Public".

    - Alternatively, you can set up a pull secret to access private packages.

[Back To The Top](#deployment-guide)

## Backend Deployment

### Create Backend Deployment

1. Create a deployment for the backend named `counter-backend` using the previously built image. Configure the following environment variables:

    - `DB_USER` sourced from the `counter-database` secret.
    - `DB_NAME` sourced from the `counter-database` secret.
    - `DB_PASSWORD` sourced from the `counter-database` secret.
    - `DB_HOST` sourced from the `counter-database` secret.

2. Create a service for the backend named `counter-backend` and map it to port `8080`.

3. Create a route for the backend to expose it to external traffic.

## Frontend Deployment

### Create Frontend Deployment

1. Create a deployment for the frontend named `counter-frontend` using the previously built image. Configure the following environment variable:

	```html
    - name: NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: BACKEND_URL
      value: "https://counter-backend-$(NAMESPACE).apps.exoscale-ch-gva-2-0.appuio.cloud"
    ```

2. Create a service for the frontend named `counter-frontend` and map it to port `3000`.

3. Create a route for the frontend to expose it to external traffic.

[Back To The Top](#deployment-guide)

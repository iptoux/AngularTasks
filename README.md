# AngularTasks

![Bildschirmfoto_20250319_113043](https://github.com/user-attachments/assets/e21b2f5f-aa61-4206-8f8c-1bd87582fe78)


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Install dependencies

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

### Run Electron app from Repo

```bash
ng build && electron .
```

### Building as (Native) App (binary)

```bash
 electron-packager ./ ./MyTaskApplication-win32-x64 --platform=win32 --overwrite
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Where are the Tasks stored?

The tasks are saved in Browsers LocalStorage.

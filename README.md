# AngularTasks


<p align="center" width="100%">
    <img src="https://img.shields.io/badge/Angular-FFD43B?style=for-the-badge&logo=angular&logoColor=darkgreen">
    <img src="https://img.shields.io/github/package-json/v/iptoux/AngularTasks?style=for-the-badge" title="GitHub package.json version">
    <img src="https://img.shields.io/github/directory-file-count/iptoux/AngularTasks?style=for-the-badge" title="GitHub repo file count (file dir extension)">
    <img src="https://img.shields.io/github/languages/code-size/iptoux/AngularTasks?style=for-the-badge" title="GitHub code size in bytes">
    <img src="https://img.shields.io/github/issues/iptoux/AngularTasks?style=for-the-badge" title="GitHub issues">
    <img src="https://img.shields.io/github/license/iptoux/AngularTasks?style=for-the-badge" title="GitHub">
    <img src="https://img.shields.io/github/actions/workflow/status/iptoux/AngularTasks/release.yml?style=for-the-badge">
    <img alt="GitHub Downloads (all assets, latest release)" src="https://img.shields.io/github/downloads/iptoux/AngularTasks/latest/total?style=for-the-badge">
</p>

[2025-03-19 23-45-01.webm](https://github.com/user-attachments/assets/bfcd3ed5-09be-4542-aba7-18e5c74e78a7)


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Install dependencies

```bash
npm install
```

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

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## Where are the Tasks stored?

The tasks are saved in Browsers LocalStorage.

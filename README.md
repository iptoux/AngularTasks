# AngularTasks


<p align="center" width="100%">
    <img src="https://img.shields.io/badge/Angular-FFD43B?style=for-the-badge&logo=angular&logoColor=darkgreen">
    <img src="https://img.shields.io/github/package-json/v/iptoux/AngularTasks?style=for-the-badge" title="GitHub package.json version">
    <img src="https://img.shields.io/github/directory-file-count/iptoux/AngularTasks?style=for-the-badge" title="GitHub repo file count (file dir extension)">
    <img src="https://img.shields.io/github/languages/code-size/iptoux/AngularTasks?style=for-the-badge" title="GitHub code size in bytes">
    <img src="https://img.shields.io/github/issues/iptoux/AngularTasks?style=for-the-badge" title="GitHub issues">
    <img src="https://img.shields.io/github/actions/workflow/status/iptoux/AngularTasks/release.yml?style=for-the-badge">
    <img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/iptoux/AngularTasks/total?style=for-the-badge"><br />
    <img src="https://custom-icon-badges.demolab.com/badge/Windows-0078D6?logo=windows11&logoColor=white&style=for-the-badge">
    <img src="https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black&style=for-the-badge">
    <img src="https://img.shields.io/badge/macOS-000000?logo=apple&logoColor=F0F0F0&style=for-the-badge">
    <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge">

</p>

![AngularTasks-git](https://github.com/user-attachments/assets/32597e9f-d3a6-46ab-a3c3-f3fe8feca5cf)


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

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

## What it is?

In the beginning **AngularTasks** was only a ***simple*** Todo for Tasks. With time many features like

 - Progressbar
 - Drag & Drop
 - DarkMode
 - Notifications
 - many more.

has been added to the Application and now, AngularTasks is a full personal tasks planing solution.

As now, all data is stored in the LocalStorage on your PC -> No Cloud option yet. You can run the Application as packed Electron Application for Linux, MacOs, Windows.

For special needs, AngularTasks also delivers a ready to run solution for docker, you just need to call the standard compose up comand.

## Demo/Images

<p align="center" width="100%">
  <img src="https://github.com/user-attachments/assets/32597e9f-d3a6-46ab-a3c3-f3fe8feca5cf" width="750" alt="AngularTasks-git">
    <br>
  <img src="https://github.com/user-attachments/assets/ead97519-e914-4de4-8ed6-4785880dd2d0" width="750" alt="AngularTasks-git-2">
</p>

## Table of Content

- [How to run?](#how-to-run)
  - [App (Electron)](#app-electron)
  - [Native (Browser)](#native-browser)
  - [Docker](#docker)
- [Downloads](#downloads)
  - [Windows](https://github.com/iptoux/AngularTasks/releases/latest)
  - [MacOs](https://github.com/iptoux/AngularTasks/releases/latest)
  - [Linux](https://github.com/iptoux/AngularTasks/releases/latest)
- FAQ
  - Where are the Data stored?
  - What features will be integrated?
  - How often the project got updates?
  - Will there come a installer and update process?
- [Development](#development)
  - [Requirements](#requirements)
  - [Build & run](#build--run)
  - Contribution
- [Testimonials](#testimonials)

## How to run?
There are a few options available to run AngularTasks. The main releases are packed as runnable 
Electron Apps, but you can also just clone and start AngularTasks[*](#requirements).

For enthusiasts, AngularTasks is also shipped with a ready to use docker compose file.

### App (Electron)

Just [download]() the lastest release, unpack and start AngularTasks

### Native (Browser)

Here you need to do some steps, for this please refer to the [**Development**](#development) section.

### Docker

> Docker needs to be installed on your system.
 
Clone repository and run `docker compose up`

## Downloads

For latest release, please visit [https://github.com/iptoux/AngularTasks/releases/latest](https://github.com/iptoux/AngularTasks/releases/latest)

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

### Requirements

```bash
npm install
```

### Build & Run
To build the project run:

```bash
ng build
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

#### Run Electron app from Repo

```bash
ng build && electron .
```

#### Building as (Native) App (binary)

```bash
 electron-packager ./ ./MyTaskApplication-win32-x64 --platform=win32 --overwrite
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Testimonials

> Its really nice, i love it and use it every day! Can't wait to see more new features soon.

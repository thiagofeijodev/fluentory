<div align="center">
  <img src="./public/logo.png" width="300px">
  <h1>Fluentory</h1>
</div>

An AI-powered web app for English learners to practice vocabulary.

<hr />

# Project Scripts

## Install dependencies

`npm i`

## Start app in dev mode

`npm start`

## Build app for production

`npm run build`

## Linter

`npm run lint`

<hr />

# Project Structure

This project follows a **feature-based architecture** with a clear separation between generic UI components and feature-specific business logic.

## Directory Organization

```
src/
├── components/              # Generic, reusable UI components (flat structure)
│   ├── Button.js
│   ├── Input.jsx
│   ├── Select.jsx
│   ├── CardItemList.jsx
│   ├── Icons.jsx
│   ├── Persona.js
│   ├── EmptyStateTemplate.jsx
│   ├── FormPageTemplate.jsx
│   ├── ListPageTemplate.jsx
│   ├── PublicTemplate.jsx
│   ├── SettingsTemplate.jsx
│   ├── SplashScreenTemplate.jsx
│   ├── TabsTemplate.jsx
│   ├── PrivateTemplate.jsx
│   └── TabsLayout/          # Complex layout component with internal hooks
│
├── features/                # Feature-specific components with business logic
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── CreateForm.jsx
│   ├── words/
│   │   ├── WordList.jsx
│   │   └── InsertWordDialog.jsx
│   └── settings/
│       └── SettingsForm.jsx
│
├── pages/                   # Page components (composition layer)
│   ├── Home.jsx
│   ├── Create.jsx
│   ├── Settings.jsx
│   └── Login.jsx
│
├── contexts/                # React Context providers
├── hooks/                   # Custom React hooks
├── db/                      # Database and Firebase integration
├── App.jsx
└── index.jsx
```

## Architecture Principles

- **`/components`**: Presentational, reusable UI components with no business logic. Think of this as a UI library.
- **`/features`**: Feature modules organized by domain. Each feature contains business logic, state management, and feature-specific components.
- **`/pages`**: Minimal page components that compose features and generic components.
- **`/contexts`**: Global state management (Auth, Theme, Translation, etc.)
- **`/hooks`**: Shared custom hooks used across the application
- **`/db`**: Database models and Firebase configuration

## Guidelines for Adding New Features

1. Create a new folder in `/src/features/{feature-name}/`
2. Add feature-specific components inside the folder
3. Import generic components from `/src/components/` as needed
4. Use pages in `/src/pages/` as the composition layer

## Links

[fluentui](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)

[firebase](https://firebase.google.com/docs/auth/web/google-signin?hl=pt&authuser=0)

[pnpm](https://pnpm.io/workspaces)

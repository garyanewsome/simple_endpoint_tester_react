# React Starter Template

## Public Service Announcement

Please keep me up to date, if changes are required or packages need updated, please open a PR 😁

## 0.5.0 UPDATE

Adds Husky, using the pre-commit git hook, Husky will run `npm run build` and add that file to the commit.

## 0.4.0 UPDATE

TypeScript introduced as the standard syntax.

## 0.3.0 UPDATE

**\*As of 0.3.0 the new [TC39 Optional Chaining](https://github.com/tc39/proposal-optional-chaining) syntax is supported. VSCode (if you use VSCode 🙂) does not support this in terms of syntax highlighting, yet. The syntax/code does work and it is in the works! [Support option chaining syntax highlighting #522](https://github.com/microsoft/TypeScript-TmLanguage/issues/522)\***

Webpack Bundle Analyzer is added to Webpack's development plugins. To run it just add the `--analyze` flag to your start script. i.e. `npm run start --analyze`. It will automatically open at `127.0.0.1:8889`

## Prerequisites

- node 10.16.0 (this project comes with an `.nvmrc` file, so it you use `nvm`(Node Version Manager), just type `nvm use` in your terminal to set the correct version of node, except on Windows, sorry Windows peeps.)
- ReactJS 16.8+
- Webpack
- Styled Components (for styling)
- Date FNS (for date and time functionality)

## Information

This is the Industry Weapon starter template build in ReactJS

The `DataProvider` file wraps our App. `DataProvider` will handle the fetching and receiving of data as well as communication with the dashboard.

We are using the `Styled Components` package for styling, [https://www.styled-components.com/](https://www.styled-components.com/).

If you need a standard css/scss file there is one available in `src/assets/styles.scss`, (the file is already setup in the build process).

The `GlobalStyle` component in the `index.js` file creates a few global styles, such as resetting the margins and padding before we start. Anything that would need applied to the entire template should be placed inside that component.

The `ThemeProvider` component in the `Container.js` is setup with our color and image information making it available in all children components.

### example calling a theme color inside a styled component

```Javascript
const Template = styled.div`
  background-color: ${({theme}) => theme.colors.bgColor };
`
```

Please use `date-fns` for any required date/time functions or parsing. Please import only the functions you need, to help keep the bundle size down and help limit the strain on the players.  
[https://date-fns.org/](https://date-fns.org/)

In production we use base64 encoded images, and it works best to use those in your sample data as well. If you have a file that is not part of the data, but lives in the template, that image can be in whatever format you desire, but it will need imported at the top of the relevant file.

## Available Components

- Pagination - simple slide component

## TODOs

- [ ] convert LC SymbolReplacer to a more generic utility component, that can take any item/symbol and restyle it.

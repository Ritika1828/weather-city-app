## Setup ask-fe Locally

    1. Git Clone this repository
        ◦ git clone git@github.com:Ritika1828/weather-city-app.git
    2. Install all the Node Modules ( use node version 18.12.1) using command.
        ◦ npm install --global yarn
        ◦ If you have nvm installed then the node version can be picked from the .nvmrc file. This will set the node version to the one used by the project. Run the following command => nvm use
        ◦ yarn install
            ▪ If this successfully installs all the packages. Go to the next step

## Setup Visual Studio Code

    1. install Eslint and Prettier-Code formatter.
    2. Add the following in setting.json file.
    `{
        "editor.fontSize": 14,
        "terminal.integrated.fontFamily": "monospace",
        "terminal.external.osxExec": "Iterm.app",
        "atomKeymap.promptV3Features": true,
        "editor.multiCursorModifier": "ctrlCmd",
        "editor.formatOnPaste": true,
        "workbench.colorTheme": "Atom One Dark",
        "git.inputValidationLength": 250,
        "git.inputValidationSubjectLength": 250,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "eslint.alwaysShowStatus": true,
        "diffEditor.ignoreTrimWhitespace": false,
        "editor.formatOnSave": true,
        "window.zoomLevel": -1,
        "gitlens.gitCommands.closeOnFocusOut": true,
    }`

## Running the app locally

    1.Connect with toppr-vpn before running the App.
    2.Run command npm run start:dev.
    3.This will start a nodemon process  on the port 1234.

    •  Now you can go to http://localhost:1234/ to access this project.
    •  Note: main branch acts as master in this repository.

## Deployed url

    url : https://weather-city-webapp.web.app/

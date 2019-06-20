# Kusunoki2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Requeriments

nodejs >= 8.9 and npm >=5.5.1

## Configuration
Enter the project directory and type `npm install`:

    $ npm install

There are two configuration files that you have to look at:

    a) Here you configure the api url

    src/environment/environment.prod.ts

    b) In this one you configure the application.

    src/environments/config.ts
        If you want to use the google maps as your provider you have to uncomment the line in index.html and add your google api key.

If you want to compile for production type:

    $ ng build --prod

It will create the js bundle  in dist/kusunoki2

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

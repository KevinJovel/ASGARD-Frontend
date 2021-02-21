# ASGARD-Frontend 💚

> Trabajo de graduación para optar al título de Ingeniero de Sistemas informáticos, denominado "Sistema informático para la gestión de activo", una app aplicada al manual de control de activo fijo de la Asociación cooperativa de aprovisionamiento agropecuario de San Sebastián ACASS de R.L.


## Equipo de desarrolladores
* Kevin Alexander Jovel Arevalo [**LinkEdin**](https://www.linkedin.com/in/kevin-alexander-jovel-arevalo-324327195/ "ver LinkedIn")
* Kevin Reinaldo Montano Orantes [**LinkEdin**](https://www.linkedin.com/in/kevin-reinaldo-montano-orantes-6a14571a5/ "ver LinkedIn")
* Saul Alfredo Reyes Alvarado.[**LinkEdin**](https://www.linkedin.com/in/sa%C3%BAl-reyes-4757021a5/ "ver LinkedIn")
* Mayra Beatriz Quintanilla Guzman.

## Docente Asesor
* Rodrigo Ernesto Vasquez Escalante

Este proyecto es propiedad de: **Universidad de El Salvador - UES**. 

# Imlementación Angular

This is a test project to demonstrate using Intern with Angular 9. It contains [all of the specs](https://angular.io/generated/live-examples/testing/app-specs.eplnkr.html) from Angular's test guide as well as [some extras](https://angular.io/generated/live-examples/testing/bag-specs.eplnkr.html). Specs have been reformatted and converted to using Intern best practices as outlined below.

## Get started

### Clone the repo

```shell
git clone https://github.com/KevinJovel/ASGARD-Frontend.git
cd (carpeta de clonacion)
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `3000`.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
* `npm run build` - runs the TypeScript compiler and asset copier once.
* `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.
* `npm run lint` - runs `tslint` on the project files.
* `npm run serve` - runs `lite-server`.

These are the test-related scripts:

* `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
* `npm run ci` - cleans, lints, and builds the application and runs Intern tests (both unit and functional) one time.
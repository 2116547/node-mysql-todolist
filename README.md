# node-msql-todolist
Nodejs server, biedt API op een ToDo list MySql database. De API endpoints zijn beveiligd met [JavaScript Web Tokens](https://jwt.io/), dus je moet inloggen voordat je de services kunt gebruiken.

## Vooraf
- nodejs installeren
- MySql of MariaDB installeren (bv. via XAMPP)
- het script `tododb.sql` importeren in MySQL. 

## Gebruik
Vanaf command line:
```
npm install
npm start
```
De server runt op [localhost:3000](http://localhost:3000) en op [Heroku](https://mynodetodolistserver.herokuapp.com/api/v1/todos).

## API Endpoints
Om de API te kunnen gebruiken moet je inloggen. Dat kan met [Postman](https://www.getpostman.com/docs/introduction). 
Stuur een POST naar /api/v1/login met in de body:

```
{
    "username": "username",
    "password": "test"
}
```
Je krijgt dan een JWT token dat je met ieder request in de header mee moet sturen. 
De header die je moet instellen:

```
Authorization:   Bearer <jwt token>
```

Voorbeelden van endpoints: 
- [localhost:3000/api/v1/todos](http://localhost:3000/api/v1/todos)
- [localhost:3000/api/v1/todos/2](http://localhost:3000/api/v1/todos/2)

## Tests
Het project bevat een aantal tests. Deze zijn natuurlijk niet compleet, maar geven een idee van hoe je een project als dit kunt testen.

Om de tests uit te voeren:
```
npm test
```
De tests worden ook, na een push naar GitHub, uitgevoerd op [Travis CI](https://travis-ci.org/avansinformatica). Het project wordt alleen als de tests slagen op [Heroku](https://mynodetodolistserver.herokuapp.com/api/v1/todos) gedeployed. De configuratie voor Travis staat beschreven in `travis.yml`.

## Static Code Analysis
Er is ook een configuratie voor static code analysis met behulp van [SonarQube](https://sonarqube.com/organizations/avansinformaticabreda/projects). Deze anayse geeft je inzicht in de kwaliteit van je code.

De analyse wordt nog op je lokale machine uitgevoerd en daarna automatisch online gezet. Je moet de analyse dus nog handmatig triggeren. Hierbij wordt gebruik gemaakt van [Gulpjs](http://gulpjs.com/), en van de npm module [sonarqube-scanner](https://www.npmjs.com/package/sonarqube-scanner).

Om een analyse uit te voeren en naar SonarQube te publiceren:

```
gulp sonarqube
```
of
```
npm run sonar
```
Bekijk eventueel ook het bestand `gulpfile.js`; dat bevat het script dat de analyse uitvoert.

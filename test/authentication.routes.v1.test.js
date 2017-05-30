//
// Tests voor versie 1 van de API.
//
// Referentie: zie http://chaijs.com/api/bdd/#members-section
//
process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('ToDoList version 1', function() {

    it('returns UnauthorizedError on GET /api/v1/todos when not logged in', function(done) {
        chai.request(server)
            .get('/api/v1/todos')
            .end(function(err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal('No authorization token was found');
                res.body.should.have.property('name').equal('UnauthorizedError');
                done();
            });
    });

    it('returns an error on POST /api/v1/login with invalid credentials ', function(done) {
        let user = {
            username: "invalid"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('error').that.is.a('string');
                res.body.error.should.equal('Invalid credentials, bye')

                done();
            });
    });

    it('returns a token on POST /api/v1/login', function(done) {
        let user = {
            username: "username",
            password: "password"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('token').that.is.a('string');
                // res.body.mijntekst.should.equal( 'Hello World!')

                // res.body.should.have.property('label').that.is.a('string');
                // res.body.label.should.equal( 'Nog meer tekst')

                // res.body.should.have.property('mijnarray').that.is.an('array');
                // res.body.mijnarray.should.be.an('array');
                // res.body.mijnarray.should.have.lengthOf(3);
                // res.body.mijnarray.should.not.have.length.above(4);
                // res.body.mijnarray.should.have.deep.property('[0]', 'tekst');
                // res.body.mijnarray.should.have.deep.property('[1]', 'nog meer tekst');
                // res.body.mijnarray.should.have.deep.property('[2]', 2);

                // res.body.should.have.property('mijnobject');
                // res.body.mijnobject.should.be.a('object');
                // res.body.mijnobject.should.have.property('mijnlabel');
                // res.body.mijnobject.mijnlabel.should.equal('mijntekst');
                // res.body.mijnobject.should.have.property('getal');
                // res.body.mijnobject.getal.should.equal(4);

                done();
            });
    });

});
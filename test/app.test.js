const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app.js').app;
const heroes = require('../app.js').heroes;

describe('hero router', () => {
    describe('GET /', () => {
        it('Should return all heroes', (done) => {
            chai.request(app).get('/heroes').end((err, res) => {
                expect(res.body[0].name).to.eq(heroes[0].name);
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });

        it('Should add a hero', (done) => {
            chai.request(app).post('/heroes').send({ id: 4, name: 'Hero4' }).end((err, res) => {
                expect(heroes[3].name).to.eq('Hero4');
                expect(heroes).to.have.lengthOf(4);
                done();
            });
        });

        it('Should delete a hero', (done) => {
            chai.request(app).delete('/heroes?name=Hero4').end((err, res) => {
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });

        it('Should not find hero to delete', (done) => {
            chai.request(app).delete('/heroes?name=HeroUndefined').end((err, res) => {
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });

        it('Should return a specific hero by id', (done) => {
            chai.request(app).get('/heroes/0').end((err, res) => {
                expect(res.body.name).to.eq(heroes[0].name);
                done();
            });
        });

        it('should update specific hero', (done) => {
            chai.request(app).put('/heroes/1').send({ id: 1, name: 'newName' }).end((err, res) => {
                expect(heroes[1].name).to.eq('newName');
                done();
            });
        });

        it('should insert new hero', (done) => {
            chai.request(app).put('/heroes/20').send({ id: 20, name: 'name20' }).end((err, res) => {
                expect(res.body[res.body.length - 1].name).to.eq('name20');
                expect(res.body).to.have.lengthOf(4);
                done();
            });
        });

        it('should delete specific hero', (done) => {
            chai.request(app).delete('/heroes/1').end((err, res) => {
                expect(res.body.find( hero => hero.id == 1)).to.not.exist;
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });
    });
});
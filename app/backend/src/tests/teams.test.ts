import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste das rotas /teams', () => {
  beforeEach(() => sinon.restore());

  it("Testa a rota /teams com o método GET - Deve retornar todos os times e seus ID's", async () => {
    
    const mockAllTeams = allTeams.map((team) => SequelizeTeam.build(team));   
    
    sinon.stub(SequelizeTeam, 'findAll').resolves(mockAllTeams);

    const apiResponse = await chai.request(app).get('/teams').send();
    
    expect(apiResponse.status).to.equals(200);
    expect(apiResponse.body).to.deep.equals(allTeams);
  })

  it("Testa a rota /teams/:id com o método GET - Deve retornar o time com ID especificado", async () => {
    const teamId = 5;
    const team = allTeams.find((item) => item.id === teamId);
    const mockTeam = SequelizeTeam.build(team);   
    
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mockTeam);

    const apiResponse = await chai.request(app).get(`/teams/${teamId}`).send();
  
    expect(apiResponse.status).to.equals(200);
    expect(apiResponse.body).to.deep.equals(mockTeam.dataValues);
  })
});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../models/MatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches } from './mocks/matches.mock'

chai.use(chaiHttp);

const { expect } = chai;
const matchModel = new MatchModel();

describe('Teste das rotas /matches', () => {
  beforeEach(() => sinon.restore());

  it("Testa a rota /matches com o método GET - Deve retornar todos os jogos com seus respectivos resultados", async () => {
    
    const allMatchesSequelize = allMatches.map((match) => SequelizeMatch.build(match));
		
		const mockAllMatches = allMatchesSequelize.map((match, index) => {
			match.dataValues.homeTeam = allMatches[index].homeTeam
			match.dataValues.awayTeam = allMatches[index].awayTeam
			return match;
		})  
		
    sinon.stub(matchModel, 'findAll').resolves(mockAllMatches);

    const apiResponse = await chai.request(app).get('/matches').send();

    expect(apiResponse.status).to.equals(200);
    expect(apiResponse.body).to.deep.equals(allMatches);
  })

  it("Testa a rota /matches/:id com o método GET - Deve retornar a partida com ID especificado", async () => {
    const matchId = 5;
    const match = allMatches.find((item) => item.id === matchId);
    const mockMatch = SequelizeMatch.build(match);   
    
    sinon.stub(matchModel, 'findById').resolves(mockMatch);

    const apiResponse = await chai.request(app).get(`/matches/${matchId}`).send();
  
    expect(apiResponse.status).to.equals(200);
    expect(apiResponse.body).to.deep.equals(mockMatch.dataValues);
  })
});

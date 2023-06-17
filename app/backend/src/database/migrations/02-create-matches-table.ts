import { Model, QueryInterface, DataTypes } from "sequelize";
import { IMatch } from "../../Interfaces/matches/IMatch";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      homeTeamId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'home_team_id',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'home_team_goals',
        allowNull: false
      },
      awayTeamId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'away_team_id',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'away_team_goals',
        allowNull: false
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress',
        allowNull: false
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
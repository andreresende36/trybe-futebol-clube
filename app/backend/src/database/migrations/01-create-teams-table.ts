import { Model, QueryInterface, DataTypes } from "sequelize";
import { ITeam } from "../../Interfaces/teams/ITeam";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      teamName: {
        type: DataTypes.STRING,
        field:'team_name',
        allowNull: false
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Teams');
  },
};
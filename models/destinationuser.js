module.exports = (sequelize, DataTypes) => {
  const DestinationUser = sequelize.define("DestinationUser", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "destinations",
        key: "id"
      }
    }
  });
  return DestinationUser;
};
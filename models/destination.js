module.exports = function(sequelize, DataTypes) {
  let Destination = sequelize.define("Destination", {
    // The email cannot be null, and must be a proper email before creation
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
      
  Destination.associate = function(models){
    Destination.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Destination;
};


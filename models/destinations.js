module.exports = function(sequelize, DataTypes) {
  const Destinations = sequelize.define("Locations", {
    // The email cannot be null, and must be a proper email before creation
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
      
    Destinations.associate = function(models){
      Destinations.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };

  return Destinations;
};


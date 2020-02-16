/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('Active','Inactive','Pending'),
      allowNull: true,
      defaultValue: 'Active'
    },
    mobile_no: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('Admin','Customer Executive'),
      allowNull: true,
      defaultValue: 'Customer Executive'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
};

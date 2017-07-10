module.exports = function(conn, Sequelize){
    var Departments = conn.define("departments", {
        dept_no: {
            type: Sequelize.CHAR(4),
            allowNull: false,
            primaryKey: true
        },
        dept_name: {
            type: Sequelize.STRING(40),
            allowNull: false
        }
    }, {
        tableName: 'departments',
        timestamps: false
    });
    return Departments; 
};
module.exports = function (conn, Sequelize) {
    var DeptEmp = conn.define("dept_emp",
        {
            emp_no: {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'employees',
                    key: 'emp_no'
                }
            },
            dept_no: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'departments',
                    key: 'dept_no'
                }
            },
            from_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            to_date: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            // don't add timestamps attributes updatedAt and createdAt
            timestamps: false, 
            tableName: 'dept_emp'
         });

    return DeptEmp;
};
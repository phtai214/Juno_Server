const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Transaction extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với Order
            Transaction.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
        }
    }

    Transaction.init({
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Orders
            }
        },
        transaction_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Đảm bảo mỗi giao dịch có một mã giao dịch duy nhất
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'), // Trạng thái giao dịch
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        modelName: 'Transaction',
        tableName: 'Transactions', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Transaction;
};

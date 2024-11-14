const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với User
            Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        }
    }

    Order.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Users
            }
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'shipping'),
            allowNull: false,
            defaultValue: 'pending' // Giá trị mặc định
        },
        payment_method: {
            type: DataTypes.ENUM('cod', 'paypal'), // Các phương thức thanh toán
            allowNull: false // Bắt buộc phải có
        },
        shipping_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: { // Thêm trường phone_number
            type: DataTypes.STRING, // Hoặc DataTypes.STRING(15) nếu bạn muốn giới hạn độ dài
            allowNull: false // Bắt buộc phải có
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
        modelName: 'Order',
        tableName: 'Orders', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Order;
};
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Shop extends Model {
        static associate(models) {
            // Có thể định nghĩa mối quan hệ ở đây nếu cần
        }
    }

    Shop.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING, // Hoặc DataTypes.TEXT nếu bạn muốn lưu trữ URL dài
            allowNull: true // Có thể để null nếu không bắt buộc
        },
        url_map: {
            type: DataTypes.TEXT, // Hoặc DataTypes.TEXT nếu cần
            allowNull: true // Có thể để null nếu không bắt buộc
        }
    }, {
        sequelize,
        modelName: 'Shop',
        tableName: 'Shops', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Shop;
};
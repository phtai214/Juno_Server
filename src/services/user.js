import db from "../models/index.js";
import bcrypt from "bcryptjs";
export const createNewUser = async ({ name, email, password }) => {
  try {
    const generateRandomNumber = () => {
      const min = Math.pow(10, 5); // 10^5 = 100,000
      const max = Math.pow(10, 6) - 1; // 10^6 - 1 = 999,999
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const newId = `${generateRandomNumber()}`;

    const newUser = await db.User.findOne({ where: { email } });
    if (newUser) {
      resolve({
        err: 1,
        mes: "Email has been registered, please use another email",
      });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const getNewUser = await db.User.create({
      id: newId,
      name,
      email,
      password: hashedPassword,
    });
    return {
      err: 0,
      mes: "User created successfully.",
      user: getNewUser,
    };
  } catch (error) {
    console.log("check err >>>", error);
    throw error;
  }
};
export const createNewUserForAdmin = async ({
  name,
  email,
  password,
  phonenumber,
}) => {
  try {
    const generateRandomNumber = () => {
      const min = Math.pow(10, 5); // 10^5 = 100,000
      const max = Math.pow(10, 6) - 1; // 10^6 - 1 = 999,999
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const newId = `${generateRandomNumber()}`;

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return {
        err: 1,
        mes: "Email has been registered, please use another email",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const getNewUser = await db.User.create({
      id: newId,
      name,
      email,
      password: hashedPassword,
      phonenumber, // Thêm phoneNumber vào đối tượng tạo
    });

    return {
      err: 0,
      mes: "User created successfully.",
      user: getNewUser,
    };
  } catch (error) {
    console.log("check err >>>", error);
    throw error;
  }
};

export const createNewUserEmployee = async ({
  name,
  email,
  password,
  position = "",
  status = "active",
  role = "",
  permissions = "",
}) => {
  try {
    const generateRandomNumber = () => {
      const min = Math.pow(10, 5); // 10^5 = 100,000
      const max = Math.pow(10, 6) - 1; // 10^6 - 1 = 999,999
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const newId = `${generateRandomNumber()}`;

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return {
        err: 1,
        mes: "Email has been registered, please use another email",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const newUser = await db.User.create({
      id: newId,
      name,
      email,
      password: hashedPassword,
      position,
      status,
      permissions: permissions.join(","), // Lưu permissions dưới dạng JSON
      role,
    });

    return {
      err: 0,
      mes: "User created successfully.",
      user: newUser,
    };
  } catch (error) {
    console.log("check err >>>", error);
    throw error;
  }
};

export const getAllUser = async (page, limit = 10) => {
  try {
    const skip = (page - 1) * limit; // Tính toán vị trí bắt đầu
    const users = await db.User.findAll({
      offset: skip,
      limit: limit,
    });
    const totalUsers = await db.User.count(); // Đếm tổng số người dùng
    const totalPages = Math.ceil(totalUsers / limit); // Tính số trang

    return {
      users,
      total: totalUsers,
      total_pages: totalPages,
      current_page: page,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw new Error("Invalid user ID");
    }
    const user = await db.User.findOne({ where: { id: userId } });
    return user;
  } catch (error) {
    console.log("check err", error);

    throw new Error(`Error getting user by ID: ${error.message}`);
  }
};

export const updateUser = async (userId, newData, fileData) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    // Cập nhật dữ liệu người dùng
    user.name = newData.name || user.name;
    user.email = newData.email || user.email;
    user.address = newData.address || user.address;
    user.role = newData.role || user.role;
    user.position = newData.position || user.position; // Thêm cập nhật cho position
    user.phonenumber = newData.phonenumber || user.phonenumber;
    user.status = newData.status || user.status;

    // Xử lý avatar
    if (fileData) {
      if (user.avatar) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      user.avatar = fileData.path;
    }

    // Cập nhật quyền
    const oldPermissions = user.permissions || [];
    const newPermissions = newData.permissions || [];

    // Xóa quyền không còn trong danh sách mới
    user.permissions = newPermissions;

    // Lưu thay đổi vào cơ sở dữ liệu
    await user.save();

    return user;
  } catch (error) {
    console.log("check err >>>>", error);
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    await user.destroy();
  } catch (error) {
    console.log("check err >>>>", error);

    throw error;
  }
};
export const updateEmployeePermissions = async (userId, permissions) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    user.permissions = permissions;
    await user.save();
    return user;
  } catch (error) {
    console.error("Lỗi khi cập nhật quyền hạn:", error);
    throw error;
  }
};

// Lấy quyền hạn của một nhân viên
export const getEmployeePermissions = async (userId) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return user.permissions;
  } catch (error) {
    console.error("Lỗi khi lấy quyền hạn nhân viên:", error);
    throw error;
  }
};

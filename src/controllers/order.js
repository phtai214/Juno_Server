import * as services from "../services";

// Create a new order
export const createNewOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await services.createOrder(orderData);
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createNewOrder controller:", error);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders (with pagination)
export const fetchAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const ordersData = await services.getAllOrders(page, limit);
    return res.status(200).json(ordersData);
  } catch (error) {
    console.error("Error in fetchAllOrders controller:", error);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get order by ID
export const fetchOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await services.getOrderById(orderId);
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error in fetchOrderById controller:", error);
    return res.status(404).json({ error: "Order not found" });
  }
};

export const fetchOrdersByUserId = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    const orders = await services.getOrderByUserId(userId);

    // Kiểm tra nếu không có đơn hàng
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Chưa có đơn hàng nào cho người dùng này." });
    }

    res.status(200).json(orders); // Trả về danh sách đơn hàng
  } catch (error) {
    res.status(500).json({ message: error.message }); // Trả về lỗi nếu có
  }
};

// Update order
export const modifyOrder = async (req, res) => {
  // try {
  //     const orderId = req.params.id;
  //     const updatedData = req.body;
  //     const updatedOrder = await services.updateOrder(orderId, updatedData);
  //     return res.status(200).json(updatedOrder);
  // } catch (error) {
  //     console.error('Error in modifyOrder controller:', error);
  //     return res.status(500).json({ error: 'Failed to update order' });
  // }
  try {
    const orderId = req.params.id;
    const updatedData = req.body;

    // Lấy thông tin đơn hàng hiện tại từ service
    const currentOrder = await services.getOrderById(orderId);

    if (!currentOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Kiểm tra logic trạng thái
    if (
      currentOrder.status === "completed" &&
      updatedData.status === "cancelled"
    ) {
      return res.status(400).json({
        error: "Không thể cập nhật trạng thái từ 'completed' sang 'cancelled'",
      });
    }

    // Gọi service để cập nhật đơn hàng
    const updatedOrder = await services.updateOrder(orderId, updatedData);
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error in modifyOrder controller:", error);
    return res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete order
export const removeOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await services.deleteOrder(orderId);
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error in removeOrder controller:", error);
    return res.status(500).json({ error: "Failed to delete order" });
  }
};

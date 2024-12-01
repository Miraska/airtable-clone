const { orderService } = require('../services');

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    // Возвращаем не только данные заявки, но и связанные сущности
    const order = await orderService.getById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createOrder = async (req, res) => {
  try {
    // Ожидаем, что `req.body` будет содержать также массивы идентификаторов ассоциированных сущностей, например:
    // {
    //   ...orderData,
    //   agents: [{ id: 1 }, { id: 2 }],
    //   managers: [{ id: 1 }]
    // }
    const newOrder = await orderService.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    // Ожидаем, что `req.body` будет содержать также массивы идентификаторов ассоциированных сущностей
    const updatedOrder = await orderService.update(req.params.id, req.body);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderService.delete(req.params.id);
    if (deletedOrder) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

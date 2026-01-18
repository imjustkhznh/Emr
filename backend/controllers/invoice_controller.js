import Invoice from '../models/Invoice.js';
import Appointment from '../models/Appointment.js';

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('appointment')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách hóa đơn',
      error: error.message
    });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('patient')
      .populate('appointment');
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Hóa đơn không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin hóa đơn',
      error: error.message
    });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, patient, appointment, items, total, dueDate } = req.body;

    const existingInvoice = await Invoice.findOne({ invoiceNumber });
    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        message: 'Số hóa đơn đã tồn tại'
      });
    }

    const subtotal = items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    const tax = subtotal * 0.1;

    const invoice = new Invoice({
      invoiceNumber,
      patient,
      appointment,
      items,
      subtotal,
      tax,
      total: subtotal + tax,
      dueDate
    });

    await invoice.save();

    res.status(201).json({
      success: true,
      message: 'Tạo hóa đơn thành công',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo hóa đơn',
      error: error.message
    });
  }
};

export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        paidDate: status === 'paid' ? Date.now() : null,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Hóa đơn không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái hóa đơn thành công',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái hóa đơn',
      error: error.message
    });
  }
};

export const getInvoiceStats = async (req, res) => {
  try {
    const totalRevenue = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const unpaid = await Invoice.countDocuments({ status: 'pending' });
    const paid = await Invoice.countDocuments({ status: 'paid' });
    const overdue = await Invoice.countDocuments({ status: 'overdue' });

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        unpaid,
        paid,
        overdue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê hóa đơn',
      error: error.message
    });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Hóa đơn không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa hóa đơn thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa hóa đơn',
      error: error.message
    });
  }
};

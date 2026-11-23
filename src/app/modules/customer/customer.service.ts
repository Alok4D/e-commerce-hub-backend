import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCustomer, TCustomerFollowUp } from './customer.interface';
import { Customer } from './customer.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { CustomerSearchableFields } from './customer.constant';
import { Order } from '../order/order.model';

const createCustomerIntoDB = async (payload: TCustomer) => {
  const isExist = await Customer.findOne({ phone: payload.phone });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Customer with this phone already exists!');
  }

  const result = await Customer.create(payload);
  return result;
};

const getAllCustomersFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const filterConditions: Record<string, unknown> = { isDeleted: false };

  if (queryObj.tag && queryObj.tag !== 'all') {
    filterConditions.tags = { $in: [queryObj.tag] };
  }

  const customerQuery = new QueryBuilder(Customer.find(filterConditions), query)
    .search(CustomerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await customerQuery.modelQuery;
  const count = await Customer.countDocuments(filterConditions);

  return {
    meta: {
      total: count,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    },
    data: result,
  };
};

const getSingleCustomerFromDB = async (idOrPhone: string) => {
  let customer = null;
  if (idOrPhone.match(/^[0-9a-fA-F]{24}$/)) {
    customer = await Customer.findOne({ _id: idOrPhone, isDeleted: false });
  }
  if (!customer) {
    customer = await Customer.findOne({ phone: idOrPhone, isDeleted: false });
  }

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found!');
  }

  // Fetch recent customer orders for the 360 profile
  const recentOrders = await Order.find({
    'customer.phone': customer.phone,
    isDeleted: false,
  })
    .sort('-createdAt')
    .limit(10);

  return {
    customer,
    recentOrders,
  };
};

const updateCustomerIntoDB = async (id: string, payload: Partial<TCustomer>) => {
  const result = await Customer.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found!');
  }
  return result;
};

const addCustomerNoteIntoDB = async (id: string, text: string, staffName: string) => {
  const customer = await Customer.findById(id);
  if (!customer || customer.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found!');
  }

  const newNote = {
    text,
    staffName,
    createdAt: new Date(),
  };

  customer.notes.unshift(newNote);
  customer.timeline.unshift({
    date: new Date(),
    type: 'NOTE',
    title: `Note logged by ${staffName}`,
    details: text,
    staffName,
  });

  await customer.save();
  return customer;
};

const addFollowUpIntoDB = async (
  id: string,
  payload: {
    dueDate: string | Date;
    task: string;
    assignee: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  },
) => {
  const customer = await Customer.findById(id);
  if (!customer || customer.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found!');
  }

  const followUp: TCustomerFollowUp = {
    id: `FU-${Date.now()}`,
    dueDate: new Date(payload.dueDate),
    task: payload.task,
    completed: false,
    assignee: payload.assignee,
    priority: payload.priority,
  };

  customer.followUps.push(followUp);
  customer.timeline.unshift({
    date: new Date(),
    type: 'CALL',
    title: `Follow-up Scheduled: ${payload.task}`,
    details: `Assigned to ${payload.assignee}, Due: ${new Date(payload.dueDate).toLocaleDateString()}`,
    staffName: payload.assignee,
  });

  await customer.save();
  return customer;
};

const toggleFollowUpStatusIntoDB = async (customerId: string, followUpId: string) => {
  const customer = await Customer.findById(customerId);
  if (!customer || customer.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found!');
  }

  const task = customer.followUps.find((fu) => fu.id === followUpId);
  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, 'Follow-up task not found!');
  }

  task.completed = !task.completed;
  await customer.save();
  return customer;
};

const getAllPendingFollowUpsFromDB = async () => {
  const customers = await Customer.find({
    isDeleted: false,
    'followUps.completed': false,
  }).select('name phone followUps');

  const tasks: Array<{
    customerId: string;
    customerName: string;
    customerPhone: string;
    id: string;
    dueDate: Date;
    task: string;
    completed: boolean;
    assignee: string;
    priority: string;
  }> = [];

  customers.forEach((cust) => {
    cust.followUps.forEach((fu) => {
      if (!fu.completed) {
        tasks.push({
          customerId: cust._id.toString(),
          customerName: cust.name,
          customerPhone: cust.phone,
          id: fu.id,
          dueDate: fu.dueDate,
          task: fu.task,
          completed: fu.completed,
          assignee: fu.assignee,
          priority: fu.priority,
        });
      }
    });
  });

  tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  return tasks;
};

export const CustomerServices = {
  createCustomerIntoDB,
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
  updateCustomerIntoDB,
  addCustomerNoteIntoDB,
  addFollowUpIntoDB,
  toggleFollowUpStatusIntoDB,
  getAllPendingFollowUpsFromDB,
};

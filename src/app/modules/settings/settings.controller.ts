import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { SettingsServices } from './settings.service';

const getSettings = catchAsync(async (req, res) => {
  const result = await SettingsServices.getSettingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Settings retrieved successfully',
    data: result,
  });
});

const updateSettings = catchAsync(async (req, res) => {
  const staffName = req.user?.userId || 'Admin';
  const role = req.user?.role || 'SUPER_ADMIN';
  const result = await SettingsServices.updateSettingsIntoDB(req.body, staffName, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Settings updated successfully',
    data: result,
  });
});

const addAuditLog = catchAsync(async (req, res) => {
  const user = req.user?.userId || 'Staff';
  const role = req.user?.role || 'STAFF';
  const result = await SettingsServices.addAuditLogIntoDB(req.body, user, role);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Audit log created successfully',
    data: result,
  });
});

export const SettingsControllers = {
  getSettings,
  updateSettings,
  addAuditLog,
};

import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { AnalyticsServices } from './analytics.service';

const getDashboardOverview = catchAsync(async (req, res) => {
  const result = await AnalyticsServices.getDashboardOverviewData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard overview analytics retrieved successfully',
    data: result,
  });
});

export const AnalyticsControllers = {
  getDashboardOverview,
};

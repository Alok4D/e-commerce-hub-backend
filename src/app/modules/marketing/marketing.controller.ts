import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { MarketingServices } from './marketing.service';

const getSocialAccounts = catchAsync(async (req, res) => {
  const result = await MarketingServices.getSocialAccountsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Social accounts retrieved successfully',
    data: result,
  });
});

const getSocialPosts = catchAsync(async (req, res) => {
  const result = await MarketingServices.getSocialPostsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Social posts retrieved successfully',
    data: result,
  });
});

const createSocialPost = catchAsync(async (req, res) => {
  const result = await MarketingServices.createSocialPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Social post scheduled/published successfully',
    data: result,
  });
});

const getCampaigns = catchAsync(async (req, res) => {
  const result = await MarketingServices.getCampaignsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Campaigns retrieved successfully',
    data: result,
  });
});

const createCampaign = catchAsync(async (req, res) => {
  const result = await MarketingServices.createCampaignIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Campaign created successfully',
    data: result,
  });
});

export const MarketingControllers = {
  getSocialAccounts,
  getSocialPosts,
  createSocialPost,
  getCampaigns,
  createCampaign,
};

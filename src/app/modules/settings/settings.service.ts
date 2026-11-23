import { TAuditLog, TSettings } from './settings.interface';
import { Settings } from './settings.model';

const getSettingsFromDB = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      rmbExchangeRate: 16.85,
      shippingBufferRmb: 2.5,
      insideDhakaFee: 60,
      outsideDhakaFee: 120,
      freeShippingThreshold: 2000,
      codEnabled: true,
      bkashMerchantNumber: '01800000000',
      supportPhone: '01700-000000',
      supportEmail: 'support@nexora.com.bd',
      auditLogs: [
        {
          id: 'LOG-INIT',
          user: 'System Admin',
          role: 'SUPER_ADMIN',
          action: 'System Initialized',
          category: 'SYSTEM',
          details: 'Default operational settings and exchange rates configured.',
          timestamp: new Date(),
        },
      ],
    });
  }
  return settings;
};

const updateSettingsIntoDB = async (payload: Partial<TSettings>, staffName = 'Admin', role = 'SUPER_ADMIN') => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(payload);
  } else {
    // Log modifications
    const changedFields = Object.keys(payload).join(', ');
    settings.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      user: staffName,
      role,
      action: 'Settings Updated',
      category: 'OPERATIONS',
      details: `Updated parameters: ${changedFields}`,
      timestamp: new Date(),
    });

    Object.assign(settings, payload);
    await settings.save();
  }
  return settings;
};

const addAuditLogIntoDB = async (payload: { action: string; category: string; details: string }, user = 'Staff', role = 'STAFF') => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }

  const log: TAuditLog = {
    id: `LOG-${Date.now()}`,
    user,
    role,
    action: payload.action,
    category: payload.category,
    details: payload.details,
    timestamp: new Date(),
  };

  settings.auditLogs.unshift(log);
  await settings.save();
  return log;
};

export const SettingsServices = {
  getSettingsFromDB,
  updateSettingsIntoDB,
  addAuditLogIntoDB,
};

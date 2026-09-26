import { storage } from './storage';

export const communityService = {
  async getNotices() {
    return storage.getCollection('notices');
  },
  async createNotice(notice) {
    const notices = storage.getCollection('notices');
    const item = {
      ...notice,
      id: `not-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    notices.unshift(item);
    storage.saveCollection('notices', notices);
    return item;
  },
  async deleteNotice(id) {
    const notices = storage.getCollection('notices').filter(n => n.id !== id);
    storage.saveCollection('notices', notices);
    return true;
  },

  async getEvents() {
    return storage.getCollection('events');
  },
  async createEvent(event) {
    const events = storage.getCollection('events');
    const item = { ...event, id: `ev-${Date.now()}` };
    events.push(item);
    storage.saveCollection('events', events);
    return item;
  },
  async deleteEvent(id) {
    const events = storage.getCollection('events').filter(e => e.id !== id);
    storage.saveCollection('events', events);
    return true;
  },

  async getFees() {
    return storage.getCollection('fees');
  },
  async markFeePaid(feeId) {
    const fees = storage.getCollection('fees');
    const idx = fees.findIndex(f => f.id === feeId);
    if (idx !== -1) {
      fees[idx].status = 'Paid';
      fees[idx].paidDate = new Date().toISOString().split('T')[0];
      fees[idx].receiptNumber = `REC-${Date.now().toString().slice(-6)}`;
      storage.saveCollection('fees', fees);
      return fees[idx];
    }
    throw new Error("Fee record not found");
  },
  async createFeeRecord(record) {
    const fees = storage.getCollection('fees');
    const item = { ...record, id: `fee-${Date.now()}` };
    fees.push(item);
    storage.saveCollection('fees', fees);
    return item;
  },

  async getNotifications(userId) {
    const list = storage.getCollection('notifications');
    return list.filter(n => n.userId === userId);
  },
  async markNotificationRead(id) {
    const list = storage.getCollection('notifications');
    const idx = list.findIndex(n => n.id === id);
    if (idx !== -1) {
      list[idx].read = true;
      storage.saveCollection('notifications', list);
    }
  }
};
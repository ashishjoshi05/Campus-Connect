import { storage } from './storage';

export const authService = {
  async login(email, password) {
    const users = storage.getCollection('users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error("No account found with this email.");
    }
    if (user.password !== password) {
      throw new Error("Incorrect password provided.");
    }

    const sessionUser = { ...user };
    delete sessionUser.password;
    localStorage.setItem('campus_connect_auth_session', JSON.stringify(sessionUser));
    return sessionUser;
  },

  getCurrentUser() {
    try {
      const session = localStorage.getItem('campus_connect_auth_session');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  async logout() {
    localStorage.removeItem('campus_connect_auth_session');
    return true;
  },

  async updateProfile(userId, payload) {
    const users = storage.getCollection('users');
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error("User not found");

    users[idx] = { ...users[idx], ...payload };
    storage.saveCollection('users', users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedSession = { ...currentUser, ...payload };
      delete updatedSession.password;
      localStorage.setItem('campus_connect_auth_session', JSON.stringify(updatedSession));
    }
    return users[idx];
  }
};
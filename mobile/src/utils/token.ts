import * as SecureStore from "expo-secure-store";

export const saveToken = (token: string) =>
  SecureStore.setItemAsync("token", token);

export const getToken = () =>
  SecureStore.getItemAsync("token");

export const deleteToken = () =>
  SecureStore.deleteItemAsync("token");

export const saveUserId = (userId: string) =>
  SecureStore.setItemAsync("userId", userId);

export const getUserId = () =>
  SecureStore.getItemAsync("userId");

export const deleteUserId = () =>
  SecureStore.deleteItemAsync("userId");

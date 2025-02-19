import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'USERS';

export const getUsers = () => { return getData(STORAGE_KEY); };
export const insertUser = async (item) => insertData(STORAGE_KEY, item);
export const updateUser = async (item) => updateData(STORAGE_KEY, item);
export const deleteUser = async (id) => deleteData(STORAGE_KEY, id);
export const getUserById = async (id) => getDataById(STORAGE_KEY, id);
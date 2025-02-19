import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'ITEMS';

export const getItems = () => { return getData(STORAGE_KEY); };
export const insertItem = async (item) => insertData(STORAGE_KEY, item);
export const updateItem = async (item) => updateData(STORAGE_KEY, item);
export const deleteItem = async (id) => deleteData(STORAGE_KEY, id);
export const getItemById = async (id) => getDataById(STORAGE_KEY, id);
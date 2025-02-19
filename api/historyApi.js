import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'HISTORY';

export const getHistory = () => { return getData(STORAGE_KEY); };
export const insertHistory = async (history) => insertData(STORAGE_KEY, history);
export const updateHistory = async (history) => updateData(STORAGE_KEY, history);
export const deleteHistory = async (id) => deleteData(STORAGE_KEY, id);
export const getHistoryById = async (id) => getDataById(STORAGE_KEY, id);
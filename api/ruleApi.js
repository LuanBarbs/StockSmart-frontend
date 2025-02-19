import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'RULES';

export const getRules = () => { return getData(STORAGE_KEY); };
export const insertRule = async (item) => insertData(STORAGE_KEY, item);
export const updateRule = async (item) => updateData(STORAGE_KEY, item);
export const deleteRule = async (id) => deleteData(STORAGE_KEY, id);
export const getRuleById = async (id) => getDataById(STORAGE_KEY, id);
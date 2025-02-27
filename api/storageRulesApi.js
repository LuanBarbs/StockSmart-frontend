import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'STORAGE_RULES';

export const getStorageRules = () => { return getData(STORAGE_KEY); };
export const insertStorageRule = async (rule) => insertData(STORAGE_KEY, rule);
export const updateStorageRule = async (rule) => updateData(STORAGE_KEY, rule);
export const deleteStorageRule = async (id) => deleteData(STORAGE_KEY, id);
export const getStorageRuleById = async (id) => getDataById(STORAGE_KEY, id);
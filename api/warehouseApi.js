import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'WAREHOUSES';

export const getWarehouses = () => { return getData(STORAGE_KEY); };
export const insertWarehouse = async (item) => insertData(STORAGE_KEY, item);
export const updateWarehouse = async (item) => updateData(STORAGE_KEY, item);
export const deleteWarehouse = async (id) => deleteData(STORAGE_KEY, id);
export const getWarehouseById = async (id) => getDataById(STORAGE_KEY, id);
import { getData, insertData, updateData, deleteData, getDataById } from "./storage";

const STORAGE_KEY = 'SHIPMENTS';

export const getShipments = () => { return getData(STORAGE_KEY); };
export const insertShipment = async (item) => insertData(STORAGE_KEY, item);
export const updateShipment = async (item) => updateData(STORAGE_KEY, item);
export const deleteShipment = async (id) => deleteData(STORAGE_KEY, id);
export const getShipmentById = async (id) => getDataById(STORAGE_KEY, id);
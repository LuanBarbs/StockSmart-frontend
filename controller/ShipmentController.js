import Shipment from "../models/Shipment";
import { getShipments, insertShipment, updateShipment, deleteShipment, getShipmentById } from "../api/shipmentApi";

class ShipmentController {
    static async listShipments() {
        try {
            const shipments = await getShipments();
            return shipments;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar remessas" };
        }
    };

    static async createShipments(req) {
        const { type, itemName, status, supplier, destination, creationDate, quantity } = req;
        
        try {
            const shipments = await getShipments();

            const newShipment = new Shipment(
                shipments.length + 1,
                type, itemName, status, supplier, destination, creationDate, quantity
            );

            await insertShipment(newShipment);
            return { status: 201, message: "Remessa criado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao criar remessa" };
        }
    };
};

export default ShipmentController;
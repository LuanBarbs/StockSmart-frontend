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

    static async createShipments(type, itemName, status, supplier, destination, creationDate, quantity) {        
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

    static async updateShipment(req) {
        const { id, type, itemName, status, supplier, destination, creationDate, quantity } = req;
        
        try {
            let shipment = await getShipmentById(id);
            if (!shipment) return { status: 400, error: "Remessa não encontrado" };

            shipment.type = type || shipment.type;
            shipment.items = itemName || shipment.items;
            shipment.status = status || shipment.status;
            shipment.supplier = supplier || shipment.supplier;
            shipment.destination = destination || shipment.destination;
            shipment.creationDate = creationDate || shipment.creationDate;
            shipment.quantity = quantity || shipment.quantity;

            await updateShipment(shipment);
            return { status: 200, message: "Remessa atualizado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao atualizar remessa" };
        }
    };
};

export default ShipmentController;
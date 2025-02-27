// Classe para Remessas.
export default class Shipment {
    constructor(id, type, items, status, supplier, destination, creationDate, quantity) {
        this.id = id;                       // Identificador único da remessa.
        this.type = type;                   // Tipo: Recebimento, Expedição, etc.
        this.items = items;                 // Lista de itens envolvidos.
        this.status = status;               // Status da remessa (Ex.: "Em Andamento").
        this.supplier = supplier;           // Fornecedor da remessa.
        this.destination = destination;     // Local de destino.
        this.creationDate = creationDate;   // Data de criação.
        this.quantity = quantity;
    };

    // Adicionar um item à remessa.
    addItem(item) {
        this.items.push(item);
    };

    // Remover um item da remessa.
    removeItem(itemId) {
        this.items = this.items.filter((item) => item.id !== itemId);
    };
};
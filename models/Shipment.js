// Classe para Remessas.
class Shipment {
    constructor(id, type, items, status, destination, creationDate) {
        this.id = id;                       // Identificador único da remessa.
        this.type = type;                   // Tipo: Recebimento, Expedição, etc.
        this.items = items;                 // Lista de itens envolvidos.
        this.status = status;               // Status da remessa (Ex.: "Em Andamento").
        this.destination = destination;     // Local de destino.
        this.creationDate = creationDate;   // Data de criação.
        this.items = [];                    // Lista de itens na remessa.
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
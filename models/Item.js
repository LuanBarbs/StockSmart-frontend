// Classe para os itens.
export default class Item {
    constructor(id, name, quantity, warehouseId, category, volume, expirationDate, createdAt, status) {
        this.id = id;
        this.name = name;                       // Nome do item.
        this.quantity = quantity;               // Quantidade atual.
        this.warehouseId = warehouseId;         // Depósito onde o item está armazenado.
        this.category = category;               // Categoria do item (eletrônicos, alimentos).
        this.volume = volume;                   // Volume unitário do item (para cálculos de ocupação).
        this.expirationDate = expirationDate;   // Data de validade (se tiver).
        this.createdAt = createdAt;             // Data de registro do item.
        this.status = status;                   // Status do item (disponível, reservado, danificado).
        this.breakDescription;                  // Descrição da avaria
    };

    // Retorna se o item está disponível.
    checkAvailability() {
        return this.quantity > 0;
    };

    //  Verifica se o item está marcado como avariado.
    isDamaged() {
        return this.status === "damaged";
    }; 
};
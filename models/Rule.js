// Classe para as regras de armazenagem.
class Rule {
    constructor(id, name, description, priority, createdBy, createdAt) {
        this.id = id;
        this.name = name;                   // Nome da regra.
        this.description = description;     // Descrição da regra.
        this.priority = priority;           // Prioridade da regra (alta, média, baixa).
        this.createdBy = createdBy;         // Identificador do usuário que criou a regra.
        this.createdAt = createdAt;         // Data da criação da regra.
    };

    // Verifica se uma regra é aplicável a um item específico.
    applyRule(item) {
        // Exemplo: Verifica se a prioridade do item corresponde à regra.
        return item.priority === this.priority;
    };

    // Retorna se a regra está ativa.
    isActive() {
        return !!this.id;
    };
};
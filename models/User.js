// Classe de Usuários (Administrador, Funcionário ou Gerente).
class User {
    constructor(id, name, role, email, password, createdAt, status) {
        this.id = id;
        this.name = name;               // Nome do usuário.  
        this.role = role;               // Função do usuário (Administrador, Gerente ou Funcionário).
        this.email = email;             // Email do usuário.
        this.password = password;       // Senha do usuário.
        this.createdAt = createdAt;     // Data da criação.
        this.status = status;           // Ativo / Inativo.
    };

    // Verifica se a senha fornecida está correta.
    authenticate(password) {
        return this.password === password;
    };

    // Define o status do usuário como inativo. 
    deactivate() {
        this.status = "inactive";
    };

    // Retorna a função do usuário.
    getRole() {
        return this.role;
    };
};

export default User;
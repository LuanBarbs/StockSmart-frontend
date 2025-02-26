import User from "../models/User";
import { getUsers, insertUser, updateUser, deleteUser, getUserById } from "../api/userApi";

class UserController {
    static async listUsers() {
        try {
            const users = await getUsers();
            return users;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar usuários" };
        }
    };

    static async createUser(req) {
        const { name, role, email, password } = req;

        try {
            // Verifica se o email já existe.
            const users = await getUsers();
            if (users.some(user => user.email === email)) {
                return { status: 400, error: "Email já registrado" };
            }

            const newUser = new User(
                users.length + 1,
                name, role, email, password,
                new Date(),
                "active"
            );

            await insertUser(newUser);
            return { status: 201, message: "Usuário criado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao criar usuário" };
        }
    };

    static async updateUser(req) {
        const { id, name, role, email, password, status } = req;

        try {
            let user = await getUserById(id);
            if (!user) return { status: 400, error: "Usuário não encontrado" };

            user.name = name || user.name;
            user.role = role || user.role;
            user.email = email || user.email;
            user.password = password || user.password;
            user.status = status || user.status;

            console.log(user);
            await updateUser(user);
            return { status: 200, message: "Usuário atualizado com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao atualizar usuário" };
        }
    };

    static async deleteUser(id) {
        try {
            let user = await getUserById(id);
            if (!user) return { status: 404, error: "Usuário não encontrado" };

            await deleteUser(id);
            return { status: 200, message: "Usuário excluído com sucesso!" };
        } catch (error) {
            return { status: 500, error: "Erro ao excluir usuário" };
        }
    }
};

export default UserController;
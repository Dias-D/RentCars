import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ id, name, username, password, email, driver_license, avatar }: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            username,
            password,
            email,
            driver_license,
            avatar
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }
}

export { UsersRepository };

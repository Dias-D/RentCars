import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { };

    async execute({ name, username, password, email, driver_license }: ICreateUsersDTO): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({ name, username, password: passwordHash, email, driver_license });
    };
}

export { CreateUserUseCase };

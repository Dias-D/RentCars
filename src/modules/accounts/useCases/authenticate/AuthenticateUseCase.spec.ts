import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUseCase: AuthenticateUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate", () => {
    beforeEach(() => { });
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUseCase = new AuthenticateUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    it("Should ve able to authenticate an user", async () => {
        const user: ICreateUsersDTO = {
            name: "Diego",
            username: "dihtest",
            email: "diego@test.com",
            password: "1234567",
            driver_license: "1234567890"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticatean nonexistent user", () => {
        expect(async () => {
            await authenticateUseCase.execute({
                email: "false@test.com",
                password: "1234567"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                name: "Diego",
                username: "dihtest",
                email: "diego@test.com",
                password: "1234567",
                driver_license: "1234567890"
            };

            await createUserUseCase.execute(user);

            await authenticateUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});

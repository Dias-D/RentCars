import dayjs from "dayjs";

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Ferrari",
            category_id: "1234569",
            daily_rate: 45,
            description: "F-40",
            fine_amount: 2,
            license_plate: "agw6e876waef68",
            name: "Ferrari"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1234567",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "12312311",
            user_id: "1234567",
            expected_return_date: dayAdd24Hours
        });

        await expect(createRentalUseCase.execute({
            user_id: "1234567",
            car_id: "12321",
            expected_return_date: dayAdd24Hours
        })).rejects.toEqual(new AppError("There's a rental in progress for user!"));
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "12321",
            user_id: "1234567",
            expected_return_date: dayAdd24Hours
        });

        await expect(createRentalUseCase.execute({
            user_id: "7537561",
            car_id: "12321",
            expected_return_date: dayAdd24Hours
        })).rejects.toEqual(new AppError("Car is unavailable!"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(createRentalUseCase.execute({
            user_id: "1234567",
            car_id: "12321",
            expected_return_date: dayjs().toDate()
        })).rejects.toEqual(new AppError("Invalid return time!"));
    });
});

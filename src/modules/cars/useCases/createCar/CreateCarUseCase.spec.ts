import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { resolveProjectReferencePath } from "typescript";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "name Car",
            daily_rate: 99,
            description: "Description Car",
            license_plate: "12379asd87fas1",
            fine_amount: 999,
            brand: "NewCar",
            category_id: "asd657fa51qw78654asd"
        });
    });

    it("Should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "name Car 1",
                daily_rate: 99,
                description: "Description Car",
                license_plate: "12379asd87fas1",
                fine_amount: 999,
                brand: "NewCar",
                category_id: "asd657fa51qw78654asd"
            });

            await createCarUseCase.execute({
                name: "name Car 2",
                daily_rate: 99,
                description: "Description Car",
                license_plate: "12379asd87fas1",
                fine_amount: 999,
                brand: "NewCar",
                category_id: "asd657fa51qw78654asd"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "name Car Available",
            daily_rate: 99,
            description: "Description Car",
            license_plate: "12379asdasdq87fas1",
            fine_amount: 999,
            brand: "NewCar",
            category_id: "asd657fa51qw78654asd"
        });

        expect(car.available).toBe(true);
    });
});

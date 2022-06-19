import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryImMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryImMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryImMemory);

    });

    it("should not be able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["4321"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryImMemory.create({
            name: "Name Car",
            daily_rate: 99,
            description: "Description Car",
            license_plate: "12379asd87fas1",
            fine_amount: 999,
            brand: "NewCar",
            category_id: "asd657fa51qw78654asd"
        });
        const specifications_id = ["4321"];

        await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
    });
});

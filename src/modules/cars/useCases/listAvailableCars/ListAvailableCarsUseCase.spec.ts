import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailablecarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailablecarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            category_id: "category_id",
            name: "Gallardo",
            daily_rate: 99,
            description: "Super-Sport",
            license_plate: "sd1sds1wdasd",
            fine_amount: 999,
            brand: "Lamborguini"
        });

        const cars = await listAvailablecarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            category_id: "category_id",
            name: "Ferouja",
            daily_rate: 99,
            description: "Mini-Sport",
            license_plate: "asd1asd1asd'",
            fine_amount: 1999,
            brand: "Ferrari"
        });

        const cars = await listAvailablecarsUseCase.execute({
            brand: "Ferrari"
        });
        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            category_id: "category_id",
            name: "ASDNOasdfq",
            daily_rate: 99,
            description: "Mini-Sport",
            license_plate: "qweqweqqwe11'",
            fine_amount: 1999,
            brand: "Aslo"
        });

        const cars = await listAvailablecarsUseCase.execute({
            name: "ASDNOasdfq"
        });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            category_id: "category_id",
            name: "ASDNOasdfq",
            daily_rate: 99,
            description: "Mini-Sport",
            license_plate: "qweqweqqwe11'",
            fine_amount: 1999,
            brand: "Aslo"
        });

        const cars = await listAvailablecarsUseCase.execute({
            category_id: "category_id"
        });
        expect(cars).toEqual([car]);
    });
});

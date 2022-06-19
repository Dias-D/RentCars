import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({ name, license_plate, daily_rate, description, category_id, brand, fine_amount }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, license_plate, daily_rate, description, category_id, brand, fine_amount
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("available = :available", { available: true });
        if (brand)
            carsQuery.andWhere("cars.brand = :brand", { brand });
        if (category_id)
            carsQuery.andWhere("cars.category_id = :category_id", { category_id });
        if (name)
            carsQuery.andWhere("cars.name = :name", { name });

        const cars = await carsQuery.getMany();

        return cars;
    }
}

export { CarsRepository };

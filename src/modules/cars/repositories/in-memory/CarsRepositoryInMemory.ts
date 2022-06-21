import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({ name, license_plate, daily_rate, description, category_id, brand, fine_amount, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name, license_plate, daily_rate, description, category_id, brand, fine_amount, id
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const allAvailable = this.cars.filter((car) => {
            if (car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)) {
                return car;
            }
            return null;
        });
        return allAvailable;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }
}

export { CarsRepositoryInMemory };

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {
    create({ name, license_plate, daily_rate, description, category_id, brand, fine_amount, specifications, id }: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
}

export { ICarsRepository };

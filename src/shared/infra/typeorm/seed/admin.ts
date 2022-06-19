import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
    const connection = await createConnection();
    const id = uuid();
    const password = await hash("admin", 8);
    const now = new Date().getTime();

    await connection.query(
        `
            INSERT INTO USERS(id, name, username, email, password, driver_license, is_admin, created_at)
            values('${id}', 'Diego Dias', 'admin', 'admin@rentx.com', '${password}', 'asd45676gqe4', true, 'now()')
        `
    );
}

create().then(() => console.log("User admin created!"));

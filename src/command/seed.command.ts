import { DataSource } from 'typeorm';
import {
    randFullName,
    randEmail,
    randPassword,
    randWord,
    randNumber,
    randJobArea,
    randJobType,
} from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { Cv } from '../cv/entities/cv.entity';

async function seedDatabase() {
    const AppDataSource = new DataSource({
        type: "mssql",
        host: "localhost",
        port: 1433,
        username: "sa",
        password: "123456",
        database: "todos",
        entities: [User, Skill, Cv],
        synchronize: true,
    });

    AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const skillRepository = AppDataSource.getRepository(Skill);
    const cvRepository = AppDataSource.getRepository(Cv);

    // Seeding Users
    for (let i = 0; i < 50; i++) {

        const user = userRepository.create({
            username: randWord(),
            email: randEmail(),
            password: randPassword(),
        });

        await userRepository.save(user);
    }

    // Seeding Skills
    for (let i = 0; i < 50; i++) {
        const skill = skillRepository.create({
            designation: randJobArea(),
        });

        await skillRepository.save(skill);
    }

    // Seeding CVs
    const users = await userRepository.find();
    for (const user of users) {
        const cv = cvRepository.create({
            name: randFullName(),
            firstname: randFullName(),
            age: randNumber({ min: 20, max: 50 }),
            cin: randNumber({ min: 10000000, max: 99999999 }).toString(),
            job: randJobType(),
            path: '/path/to/cv.pdf',
            user: user,
        });

        await cvRepository.save(cv);
    }

    console.log('Database has been seeded!');
    await AppDataSource.destroy();
}
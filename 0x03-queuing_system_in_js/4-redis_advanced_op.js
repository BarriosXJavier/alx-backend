import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

const hgetallAsync = promisify(client.hgetall).bind(client);

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(`${schoolName}: ${value}`);
    } catch (error) {
        console.error(`Error fetching value for ${schoolName}: ${error.message}`);
    }
}

function createHolbertonSchoolsHash() {
    client.hset('HolbertonSchools', 'Portland', 50, redis.print);
    client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
    client.hset('HolbertonSchools', 'New York', 20, redis.print);
    client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
    client.hset('HolbertonSchools', 'Cali', 40, redis.print);
    client.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

async function displayHolbertonSchoolsHash() {
    try {
        const schools = await hgetallAsync('HolbertonSchools');
        console.log(schools);
    } catch (error) {
        console.error(`Error fetching HolbertonSchools hash: ${error.message}`);
    }
}

// Store the hash
createHolbertonSchoolsHash();

displayHolbertonSchoolsHash();

client.quit();
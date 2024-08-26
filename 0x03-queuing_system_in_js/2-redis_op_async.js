import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, client.print);
}

const asyncGet = promisify(client.get).bind(client);

function displaySchoolValue(schoolName) {
   try {
        const value = asyncGet(schoolName);
        console.log(value);
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

client.quit()
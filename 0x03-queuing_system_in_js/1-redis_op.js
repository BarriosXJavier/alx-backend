import { createClient } from 'redis';

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

function displaySchoolValue(schoolName) {
    client.get(schoolName, (error, reply) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(schoolName, reply);
        }
    })
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

client.quit()
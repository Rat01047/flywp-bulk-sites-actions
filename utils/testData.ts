import { config as dotenvConfig } from 'dotenv';
dotenvConfig(); // Load environment variables from .env file
import { faker } from '@faker-js/faker';


// Url data
let Urls: {
    baseUrl: string;
} = {
    // Main Site URL
    baseUrl: process.env.SITE_URL || '', // Using 'https://staging-app.flywp.com' as default
};


let Users: {
     // User Credentials
     userEmail: string;
     userPassword: string;
     currentTeamId: number;
     serverId: number;
     teamOwnerName: string;

 } = {
     // User Credentials
     userEmail: process.env.ADMIN_EMAIL || '', // Providing a default value ('') when process.env.STAGING_USEREMAIL is undefined
     userPassword: process.env.ADMIN_PASSWORD || '', // Similarly, providing a default value for userPassword
     currentTeamId: 0,
     serverId: 0,
     teamOwnerName: '',
};





// Server data
let Servers: {
    serverName: string;
} = {
    serverName: process.env.SERVER_NAME || '', // Providing a default value ('') when process.env.SERVER_NAME is undefined
};


// Server data
let Sites: {
    sitesCount: number;
} = {
    sitesCount: Number(process.env.SITES_COUNT) || 1, // Providing a default value (1) when process.env.SITES_COUNT is undefined

};



/**------------------------------*/
/**-------Export DATA_SET-------*/
/**----------------------------*/
export {
    Urls,
    Users,
    Servers,
    Sites
};

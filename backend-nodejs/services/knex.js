const pg = require('knex')({
    client: 'pg',
    connection: 'postgres://exjwnrqxsteyxb:c7434c886bec31884847447bc9ea71625668af02a0a9dd5141649d4a6a423ff4@ec2-52-73-149-159.compute-1.amazonaws.com:5432/d72edccielbvt5',
    searchPath: ['knex', 'public']
  });
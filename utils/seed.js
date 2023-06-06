const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    await Thought.deleteMany({});
    await User.deleteMany({});
   
    const users = [
            { username: 'Tswizzle', email: 'thetaytayswift@gmail.com' },
            { username: 'DJK', email: 'anothaone@tg.com' },
            { username: 'JohnWick', email: 'Jwick@youkilledmydog.com' },
            { username: 'Link', email: 'stopgettingkidnapped@zelda.com' },
            { username: 'Mario', email: 'shroomsarefun@toad.com' },
            { username: 'Thechosenone', email: 'Askywalker@masterjedi.com' },
        ];
    await User.collection.insertMany(users);
    console.table(users);
    console.info('users added');

    const thoughts = [
            { thoughtText: 'Shake it off, Shake it off', username: 'Tswizzle' },
            { thoughtText: 'Anotha One', username: 'DJK' },
            { thoughtText: 'Yeah', username: 'JohnWick' },
            { thoughtText: 'HYAH-HYAH-HYUH', username: 'Link' },
            { thoughtText: 'Wahooo', username: 'Mario' },
            { thoughtText: 'This is where the fun begins', username: 'Thechosenone' },
        ];
    await Thought.collection.insertMany(thoughts);
    console.table(thoughts);
    console.info('Thoughts added');

    process.exit(0);
});
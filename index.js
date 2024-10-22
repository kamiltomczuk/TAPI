import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import characterSchema from './models/characterModel.js';
import spellSchema from './models/spellModel.js';
import resolvers from './models/resolvers.js';
import { characters, spells } from './data/data.js';

const typeDefs = `
  ${characterSchema}
  ${spellSchema}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/character/:id', (req, res) => {
    const character = characters.find(c => c.id === req.params.id);
    if (character) {
        // Resolve full spell details for favoriteSpells
        const favoriteSpells = character.favoriteSpells.map(spellId => spells.find(spell => spell.id === spellId));
        res.json({ ...character, favoriteSpells });
    } else {
        res.status(404).send('Character not found');
    }
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
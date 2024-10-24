import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { specifiedRules } from 'graphql';
import characterSchema from './models/characterModel.js';
import spellSchema from './models/spellModel.js';
import resolvers from './models/resolvers.js';
import { validateFriendEnemyCharacterFields } from './validationRules.js';
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
app.use(express.json()); // Middleware to parse JSON request bodies


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/characters', (req, res) => {
    const allCharacters = characters.map(character => {
        const favoriteSpells = character.favoriteSpells.map(spellId => spells.find(spell => spell.id === spellId));
        const friends = character.friends.map(friend => {
            const friendEnemyCharacter = characters.find(c => c.id === friend.character.id);
            if (friendEnemyCharacter) {
                return {
                    id: friend.character.id,
                    firstName: friendEnemyCharacter.firstName,
                    lastName: friendEnemyCharacter.lastName,
                    fullName: friendEnemyCharacter.fullName,
                    relationshipType: friend.relationshipType
                };
            } else {
                return null;
            }
        }).filter(friend => friend !== null);
        const enemies = character.enemies.map(enemy => {
            const enemyCharacter = characters.find(c => c.id === enemy.character.id);
            if (enemyCharacter) {
                return {
                    id: enemy.character.id,
                    firstName: enemyCharacter.firstName,
                    lastName: enemyCharacter.lastName,
                    fullName: enemyCharacter.fullName,
                    relationshipType: enemy.relationshipType
                };
            } else {
                return null;
            }
        }).filter(enemy => enemy !== null);

        return {
            ...character,
            favoriteSpells,
            friends,
            enemies
        };
    });
    res.json(allCharacters);
});

app.get('/character/:id', (req, res) => {
    const character = characters.find(c => c.id === req.params.id);
    if (character) {
        const favoriteSpells = character.favoriteSpells.map(spellId => spells.find(spell => spell.id === spellId));
        const friends = character.friends.map(friend => {
            const friendEnemyCharacter = characters.find(c => c.id === friend.character.id);
            if (friendEnemyCharacter) {
                return {
                    id: friend.character.id,
                    firstName: friendEnemyCharacter.firstName,
                    lastName: friendEnemyCharacter.lastName,
                    fullName: friendEnemyCharacter.fullName,
                    relationshipType: friend.relationshipType,
                    link: `/character/${friend.character.id}`
                };
            } else {
                return null;
            }
        }).filter(friend => friend !== null);
        const enemies = character.enemies.map(enemy => {
            const enemyCharacter = characters.find(c => c.id === enemy.character.id);
            if (enemyCharacter) {
                return {
                    id: enemy.character.id,
                    firstName: enemyCharacter.firstName,
                    lastName: enemyCharacter.lastName,
                    fullName: enemyCharacter.fullName,
                    relationshipType: enemy.relationshipType,
                    link: `/character/${enemy.character.id}`
                };
            } else {
                return null;
            }
        }).filter(enemy => enemy !== null);

        const characterWithLinks = {
            ...character,
            favoriteSpells,
            friends,
            enemies
        };

        res.json(characterWithLinks);
    } else {
        res.status(404).send('Character not found');
    }
});

app.get('/spell/:id', (req, res) => {
    const spell = spells.find(s => s.id === req.params.id);
    if (spell) {
        res.json(spell);
    } else {
        res.status(404).send('Spell not found');
    }
});

app.get('/spells', (req, res) => {
    res.json(spells);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    validationRules: [...specifiedRules, validateFriendEnemyCharacterFields]
  }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
import { GraphQLError } from 'graphql';

const allowedFields = ['id', 'firstName', 'lastName', 'fullName'];

export const validateFriendEnemyCharacterFields = (context) => {
  return {
    Field(node) {
      if (node.name.value === 'character' && node.selectionSet) {
        const parentField = context.getParentType().name;
        if (parentField === 'Relationship') {
          const requestedFields = node.selectionSet.selections.map(selection => selection.name.value);
          const disallowedFields = requestedFields.filter(field => !allowedFields.includes(field));

          if (disallowedFields.length > 0) {
            context.reportError(new GraphQLError(`You can only query the id, firstName, lastName, and fullName of the friend or enemy character. Disallowed fields: ${disallowedFields.join(', ')}`, node));
            // Stop further validation for this node
            node.selectionSet.selections = node.selectionSet.selections.filter(selection => allowedFields.includes(selection.name.value));
          }
        }
      }
    }
  };
};
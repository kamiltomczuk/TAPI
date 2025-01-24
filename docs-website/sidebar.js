const sidebars = {
    tutorialSidebar: [
      {
        type: 'doc',
        id: 'intro',
        label: 'Introduction',
      },
      {
        type: 'category',
        label: 'REST API',
        items: [
          'rest-api/overview',
          'rest-api/characters',
          'rest-api/spells',
          'rest-api/creatures',
        ],
      },
      {
        type: 'category',
        label: 'GraphQL API',
        items: [
          'graphql/overview',
          'graphql/queries',
          'graphql/mutations',
        ],
      },
      {
        type: 'category',
        label: 'gRPC Services',
        items: [
          'grpc/overview',
          'grpc/character-service',
          'grpc/spell-service',
          'grpc/creature-service',
        ],
      },
    ],
  };
  
  export default sidebars;
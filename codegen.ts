import { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
  schema: 'http://localhost:5050/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments:true,
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
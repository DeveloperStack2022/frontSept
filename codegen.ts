// import { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//     schema: 'http://localhost:5050/graphql',
//     documents: ['src/**/*.tsx'],
//     generates: {
//       './src/__generated__/': {
//         preset: 'client',
//         plugins: ['typescript'],
//         presetConfig: {
//           gqlTagName: 'gql',
//         },
//         config: {
//           avoidOptionals: {
//             field: true,
//             constEnums:true,
//             inputValue:true,
//             object:true,
//             defaultValue:true
//           }
//         }
//       }
//     },
//     ignoreNoDocuments: true,
//   };

// export default config;
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
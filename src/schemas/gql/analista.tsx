import {graphql} from '@/gql/gql'

export const GetAnalistaByUnidad = graphql(`
    query GetAnalistaByUnidad($nombreUnidad: String!) {
        getAnalistaByUnidad(nombre_unidad: $nombreUnidad) {
            analistas {
                zona {
                    nombre_zona
                }
                unidad {
                    nombre_unidad
                }
                direccion {
                    nombre_direccion
                }
                nombres
                grado
                cedula
                id
            }
        }
    }
`)

export const GetAnalistaByNumCl = graphql(`
query GetAnalistaByNumCl($numeroCedula: String!) {
    getAnalistaByNumCl(numero_cedula: $numeroCedula) {
        id
        cedula
        grado
        nombres
        unidad {
            nombre_unidad
            _id
        }
        zona {
            nombre_zona
            _id
        }
        direccion {
            nombre_direccion
        }
    }
} `)

export const GetAnalistaByGrado = graphql(`query Analistas($grado: String!) {
    getAnalistaByGrado(grado: $grado) {
      analistas {
        nombres
        cedula
        grado
        id
        direccion {
          nombre_direccion
        }
        unidad {
          _id
          nombre_unidad
        }
        zona {
          _id
          nombre_zona
        }
      }
    }
  }`)



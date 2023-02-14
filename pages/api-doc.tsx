import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { createSwaggerSpec } from 'next-swagger-doc'
import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic<{
   spec: any
}>(import('swagger-ui-react'), { ssr: false })

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
   return <SwaggerUI spec={spec} />
}

export const getStaticProps: GetStaticProps = async () => {
   const spec: Record<string, any> = createSwaggerSpec({
      definition: {
         openapi: '3.0.0',
         info: {
            title: 'Epic Road Trip API Documentation',
            version: '1.0',
         },
         schemes: ['https', 'http'],
         consumes: ['application/json'],
         produces: ['application/json'],
         tags: [
            {
               name: 'enjoy',
               description: 'Retrieve events',
               externalDocs: {
                  description: 'Based on Ticket Master API',
                  url: 'https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/',
               },
            },
            {
               name: 'eat',
               description: 'Retrieve restaurants',
               externalDocs: {
                  description: 'Based on Google Places API',
                  url: 'https://developers.google.com/maps/documentation/places/web-service',
               },
            },
            {
               name: 'drink',
               description: 'Retrieve bars',
               externalDocs: {
                  description: 'Based on Google Places API',
                  url: 'https://developers.google.com/maps/documentation/places/web-service',
               },
            },
            {
               name: 'travel',
               description: 'Retrieve ways of locomotion',
               externalDocs: {
                  description: 'Based on Google Places API',
                  url: 'https://developers.google.com/maps/documentation/places/web-service',
               },
            },
            {
               name: 'drink',
               description:
                  'Retrieve places you can take a drink(bars, restaurants, ...) around you',
               externalDocs: {
                  description: 'Based on Google Places API',
                  url: 'https://developers.google.com/maps/documentation/places/web-service',
               },
            },
            {
               name: 'travel',
               description:
                  'Retrieve transportations an their locations(airport, bus stations, train stations, ...) around you',
               externalDocs: {
                  description: 'Based on Google Places API',
                  url: 'https://developers.google.com/maps/documentation/places/web-service',
               },
            },
            {
               name: 'sleep',
               description:
                  'Retrieve accommodations(hotels, Airbnb,...)around you',
               externalDocs: {
                  description: 'Based on Google Places API',
                  url: 'https://developers.google.com/maps/documentation/places/web-service',
               },
            },
         ],
         paths: {
            '/api/enjoy/{geoHash}': {
               get: {
                  tags: ['enjoy'],
                  summary: 'Get events around a specific geoPoint',
                  description: 'Returns an array of events',
                  produces: ['application/json'],
                  parameters: [
                     {
                        name: 'geoHash',
                        in: 'path',
                        description:
                           'geoHash is constructed with the latitude and the longitude of a position (max length : 9)',
                        required: true,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'q',
                        in: 'query',
                        description:
                           "The text string on which to search; This must be an event's name",
                        required: false,
                        schema: {
                           type: 'string',
                        },
                     },
                  ],
                  responses: {
                     200: {
                        description: 'Successful operation',
                        // schema: {
                        //     $ref: "#/definitions/Event",
                        // },
                     },
                     400: {
                        description: 'Invalid GeoHash supplied.',
                     },
                     404: {
                        description: 'GeoHash does not exist.',
                     },
                  },
               },
            },
            '/api/eat/{latLong}': {
               get: {
                  tags: ['eat'],
                  summary: 'Get restaurants with latitude and longitute',
                  description: 'Returns an array of places where you can eat',
                  produces: ['application/json'],
                  parameters: [
                     {
                        name: 'latLong',
                        in: 'path',
                        description:
                           "latLong is composed as in 'latitude,longitude'",
                        required: true,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'radius',
                        in: 'query',
                        description:
                           'the distance (in meters) within which to return place results',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'minprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'maxprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'search',
                        in: 'query',
                        description:
                           'The text string on which to search; This must be a place name, address, or category of establishments',
                        required: false,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'opened',
                        in: 'query',
                        description:
                           'The places that are open for business at the time the query is sent. Places that do not specify opening hours in the Google Places database will not be returned',
                        schema: {
                           type: 'string',
                        },
                     },
                  ],
                  responses: {
                     200: {
                        description: 'Successful operation',
                        // schema: {
                        //     $ref: "#/definitions/Event",
                        // },
                     },
                     400: {
                        description: 'Invalid GeoHash supplied.',
                     },
                     404: {
                        description: 'GeoHash does not exist.',
                     },
                  },
               },
            },
            '/api/drink/{latLong}': {
               get: {
                  tags: ['drink'],
                  summary: 'Get bars with latitude and longitute',
                  description: 'Returns an array of places where you can drink',
                  produces: ['application/json'],
                  parameters: [
                     {
                        name: 'latLong',
                        in: 'path',
                        description:
                           "latLong is composed as in 'latitude,longitude'",
                        required: true,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'radius',
                        in: 'query',
                        description:
                           'the distance (in meters) within which to return place results',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'minprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'maxprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'search',
                        in: 'query',
                        description:
                           'The text string on which to search; This must be a place name, address, or category of establishments',
                        required: false,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'opened',
                        in: 'query',
                        description:
                           'The places that are open for business at the time the query is sent. Places that do not specify opening hours in the Google Places database will not be returned',
                        schema: {
                           type: 'string',
                        },
                     },
                  ],
                  responses: {
                     200: {
                        description: 'Successful operation',
                        // schema: {
                        //     $ref: "#/definitions/Event",
                        // },
                     },
                     400: {
                        description: 'Invalid LatLong supplied.',
                     },
                     404: {
                        description: 'LatLong does not exist.',
                     },
                  },
               },
            },
            '/api/travel/{latLong}': {
               get: {
                  tags: ['travel'],
                  summary: 'Get transports with latitude and longitute',
                  description: 'Returns an array of transports',
                  produces: ['application/json'],
                  parameters: [
                     {
                        name: 'latLong',
                        in: 'path',
                        description:
                           "latLong is composed as in 'latitude,longitude'",
                        required: true,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'radius',
                        in: 'query',
                        description:
                           'the distance (in meters) within which to return place results',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'minprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'maxprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'search',
                        in: 'query',
                        description:
                           'The text string on which to search; This must be a place name, address, or category of establishments',
                        required: false,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'opened',
                        in: 'query',
                        description:
                           'The places that are open for business at the time the query is sent. Places that do not specify opening hours in the Google Places database will not be returned',
                        schema: {
                           type: 'string',
                        },
                     },
                  ],
                  responses: {
                     200: {
                        description: 'Successful operation',
                        // schema: {
                        //     $ref: "#/definitions/Event",
                        // },
                     },
                     400: {
                        description: 'Invalid LatLong supplied.',
                     },
                     404: {
                        description: 'LatLong does not exist.',
                     },
                  },
               },
            },
            'api/lodging/latLong': {
               get: {
                  tags: ['sleep'],
                  summary: 'Get rooms with latitude and longitude',
                  description:
                     'Returns an array of places where you can spend a night ',
                  produces: ['application/json'],
                  parameters: [
                     {
                        name: 'latLong',
                        in: 'path',
                        description:
                           "latLong is composed as in 'latitude,longitude'",
                        required: true,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'radius',
                        in: 'query',
                        description:
                           'the distance (in meters) within which to return place results',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'minprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'maxprice',
                        in: 'query',
                        description:
                           'The results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive',
                        required: false,
                        schema: {
                           type: 'integer',
                        },
                     },
                     {
                        name: 'search',
                        in: 'query',
                        description:
                           'The text string on which to search; This must be a place name, address, or category of establishments',
                        required: false,
                        schema: {
                           type: 'string',
                        },
                     },
                     {
                        name: 'opened',
                        in: 'query',
                        description:
                           'The places that are open for business at the time the query is sent. Places that do not specify opening hours in the Google Places database will not be returned',
                        schema: {
                           type: 'string',
                        },
                     },
                  ],
                  responses: {
                     200: {
                        description: 'Successful operation',
                     },
                     400: {
                        description: 'Invalid LatLong supplied.',
                     },
                     404: {
                        description: 'LatLong does not exist.',
                     },
                  },
               },
            },
         },
         // definitions: {
         //     Event: {
         //         type: "object",
         //         properties: {
         //             id: {
         //                 type: "integer",
         //                 format: "int64",
         //             },
         //             name: {
         //                 type: "integer",
         //                 format: "int64",
         //             },
         //         },
         //         xml: {
         //             name: "Event",
         //         },
         //     },
         //     Restaurant: {
         //         type: "object",
         //         properties: {
         //             id: {
         //                 type: "integer",
         //                 format: "int64",
         //             },
         //             name: {
         //                 type: "integer",
         //                 format: "int64",
         //             },
         //         },
         //         xml: {
         //             name: "Event",
         //         },
         //     },
         // },
      },
   })

   return {
      props: {
         spec,
      },
   }
}

export default ApiDoc

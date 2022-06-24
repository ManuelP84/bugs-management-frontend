export const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}


export const errorInState = (errorMessage: string) => {
    return `Something went wrong while fetching: ${errorMessage}`
}

export const ENDPOINT = "htttp://localhost/8080/"


export type ErrorType = null | string


export enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
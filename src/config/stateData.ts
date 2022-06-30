export const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}


export const errorInState = (errorMessage: string) => {
    return `Something went wrong while fetching: ${errorMessage}`
}

export const ENDPOINT = "https://bugs-management-api.herokuapp.com"
// export const ENDPOINT = "http://localhost:8080"


export type ErrorType = null | string


export enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
export type TNftItemUri = {
    name: string,
    description: string,
    image: string,
    image_url?: string,
    attributes?: {[key: string]: any}[]
}
export type TNftFormValues = {
    name: string,
    description: string,
    image: string[]
}
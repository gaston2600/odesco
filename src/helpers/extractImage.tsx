import { urls } from "../utils";

export function extractImage(url: string) {
    return url ? `${urls.apiURL}/${url}` : null
}
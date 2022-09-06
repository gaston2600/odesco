export function extractFilters(payload: any) {
    let filters = "";
    if (payload.filters) {
        for (const key in payload.filters) {
            if (Object.hasOwnProperty.call(payload.filters, key)) {
                if (payload.filters[key] && payload.filters[key] !== "") {
                    filters += `&${key}=${payload.filters[key]}`;
                }
            }
        }
    }
    return filters
}
export function SearchFilterBindJson (filter: any, json: any) {
    let diff = false;
    json = { ...json }
    delete json.product_id
    for (const key in json) {
        if (filter[key] != json[key]) {
            diff = true;
            filter[key] = json[key]
        }
    }
    return diff
}
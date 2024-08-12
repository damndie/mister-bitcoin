
function store(key: string | number, value: any) {
    localStorage[key] = JSON.stringify(value);
}

function load(key: string | number, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
export const storageServiceBitCoin = {
    store,
    load
}

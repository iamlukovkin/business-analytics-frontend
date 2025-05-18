export const fetchData = async (requestUrl) => {
    const request = await fetch(requestUrl, {method: 'GET', headers: {'Accept': '*/*'}});
    if (request.ok) {
        return await request.json();
    }
    return null;
}
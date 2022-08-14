 function getRandomInRange(from: number, to: number) {
    return (Math.random() * (to - from) + from) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

export default async function Get(
    url: string,
    headers:Record<string, unknown> = {}
): Promise<any>{
    try {
        const response: any ={}
        return response.json();
    } catch (e) {
        throw new Error();
    }
}

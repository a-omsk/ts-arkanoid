export function randomBoolGenerator(successPercent: number = 50): Function {
    const border = 255 - Math.round(255 / 100 * successPercent);
    const cryptoTypedArray = new Uint8Array(1);

    return function () {
        crypto.getRandomValues(cryptoTypedArray);
        return cryptoTypedArray[0] > border;
    };
}
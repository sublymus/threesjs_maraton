let i = 0;

export function generateUid(): string {
    return Date.now() + "_" + Number((++i) + Math.trunc(Math.random() * 9e9 + 1e6)).toString(36);
}

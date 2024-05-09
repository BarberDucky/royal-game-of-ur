export function getRandomBool() {
    return Math.random() < 0.5
}

export function getRandomInt(upperLimit: number) {
    return Math.floor(Math.random() * upperLimit)
}
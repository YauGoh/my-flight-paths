export const toRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180.0;
}

export const getArcAngle = (radius: number, distance: number) => {
    return distance / radius;
}

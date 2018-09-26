export default (baseFare, timeRate, time, distanceRate, distance, surge) => {
    const distanceKM = distance / 1000;
    const timeMin = time / 60;
    const priceMin = timeRate * timeMin;
    const priceKM = distanceRate * distanceKM;
    
    return Math.round((baseFare + priceKM + priceMin) * surge);
}
module.exports = {
    toLocations(markers) {
        const { map, flatten } = _;

        const locationGroups = map(markers, ({ locations, distance }) => {
            return map(locations, location => {
                if (distance) {
                    location.distance = distance
                }

                return location;
            })
        });

        return flatten(locationGroups);
    }
};

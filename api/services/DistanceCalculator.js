import haversine from 'haversine';

module.exports = (collection, { latitude, longitude }) => {
    const { isNumber, each, sortBy, cloneDeep } = _;
    const _collection = cloneDeep(collection);

    if (isNumber(latitude) && isNumber(longitude)) {

        each(_collection, item => {
            const start = {latitude, longitude};
            const end = {
                latitude: item.lat,
                longitude: item.lng
            };

            item.distance = haversine(start, end, {unit: 'km'});
        });

        return sortBy(_collection, 'distance');
    }
};


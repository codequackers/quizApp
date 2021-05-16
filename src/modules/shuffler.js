function shuffler(array, seed) {
    let currentIndex = array.length, tempValue, randomIndex;
    seed = seed || 1;

    let random = function (index) {
        let x = Math.sin(seed) * 10000;
        return Math.floor((x - Math.floor(x)) * index);
    }

    while (currentIndex !== 0) {
        // Pick an element:
        randomIndex = random(currentIndex);
        currentIndex -= 1;
        // Swap element with the current element
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
};

export default shuffler;
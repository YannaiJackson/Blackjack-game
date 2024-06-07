

export default function removeFirstOccurence(array, item) {
    const index = array.indexOf(item); // Find the index of the item
    if (index !== -1) { // If the item is found
        array.splice(index, 1); // Remove the item at the found index
    }
}
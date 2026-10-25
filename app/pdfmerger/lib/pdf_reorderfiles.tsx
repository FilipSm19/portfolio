
export default function ReorderFiles(index: number, files: File[]) {
    const reoderedArray = [...files];
    const currentValue = files[index];

    if (index == 0) {
        reoderedArray[index] = reoderedArray[files.length - 1]; // Set Current Index to Value of Last in Stack
        reoderedArray[files.length - 1] = currentValue; // Set Last in Stack as Current Value
    }
    else {
        reoderedArray[index] = reoderedArray[index - 1]; // Set Current Index to Value of Previous In Stack
        reoderedArray[index - 1] = currentValue; // Set Previous Value in Stack to Current Value

    }

    return reoderedArray;
}

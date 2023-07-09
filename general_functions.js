function extractWords(string) {
    // Time complexity: O(n); Space complexity: O(n)
    let a = [''];
    for(let i = 0; i < string.length; i++) {
        if(string[i] === " ") {
            a.push("");
        } else {
            a[a.length - 1] += string[i];
        }
    }
}
function extractNum(string) {
    // Time complexity: O(n); Space complexity: O(n)
    let a = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
    };
    let b = [], c = undefined;

    for(let i = 0; i < string.length; i++) {
        if(a.hasOwnProperty(string[i])) {
            b.push(a[string[i]]);
        } else if(string[i] === ".") {
            if(c === undefined) {
                c = b.length;
            } else {
                break;
            }
        } else {
            break;
        }
    }

    let d = 0;

    for(let j = 0; j < b.length; j++) {
        d += Math.pow(10, b.length - j - 1) * b[j];
    }

    return(d / Math.pow(10, b.length - (c || b.length)));
}
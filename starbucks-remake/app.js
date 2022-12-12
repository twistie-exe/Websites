

closeSecondDiv = (string) => {
    const div = "<div>";
    let newString = "";
    for (let i=0; i<string.length; i++) {
        for (let j=0; j<div.length; j++) {
            console.log(string[i+1]);
            if (string[i] !== "/") {
                console.log[string[i]];
            }
            if (string[i] === div[j]) {
                newString += string[i];
            }
        }
    }
    // return newString;
}

console.log(closeSecondDiv("<div><div><div>"));
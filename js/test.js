function setTimeConverter(time){
    // console.log(time);
    let hours = parseInt(time / 3600);
    let seconds = time % 3600;
    let minutes = parseInt(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `Hours ${hours} Minute ${minutes} Seconds ${remainingSeconds} `
}

console.log(setTimeConverter(47897));
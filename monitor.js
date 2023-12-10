const os = require('os-utils');
const disk = require('diskusage');

const refreshRate = 1000;

// Function to get and log CPU usage
function logCPUUsage(callback) {
    os.cpuUsage(function (cpuUsage) {
        let cpuUsagePercentage = cpuUsage * 100;
        cpuUsagePercentage = roundToXDigits(cpuUsagePercentage, 2);
        console.log(cpuUsagePercentage + '%');
    });
}

// Function to get and log disk usage
function logDiskUsage(callback) {
    disk.check('/', function (err, info) {
        let diskUsagePercentage = 100 - (info.free / info.total) * 100;
        diskUsagePercentage = roundToXDigits(diskUsagePercentage, 2);
        console.log(diskUsagePercentage + '%');
    });
}

function roundToXDigits(number, digits) {
    const roundedNumber = Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
    return roundedNumber;
}

// Log CPU and disk usage every 5 seconds
setInterval(() => {
    logCPUUsage();
    logDiskUsage();
    // Clear console
}, refreshRate);
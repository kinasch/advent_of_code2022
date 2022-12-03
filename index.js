const child_process = require('child_process');
child_process.execSync('node ./day'+process.argv[2]+'/main.js',{stdio:[0,1,2]})
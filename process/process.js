process.cwd();
// process.pid;
// process.memoryUsage();
// process.version;

console.log(process.argv);

// node process 1 2 3
// node process a 2 -a
// node process
// node process --mode development

console.log(process.argv.slice(2));

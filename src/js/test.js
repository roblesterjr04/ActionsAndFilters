// minifyOnSave: false
//

var actions = require('./actions.js');

actions.addAction('test', function() {
    console.log('this is the test hook');
});

actions.addAction('test', function() {
    console.log('this is the other test hook');
});

actions.addAction('test', function(data) {
    console.log('this is the other test hook: ' + data);
});

actions.addFilter('testFilter', function(filtered) {
    return 'this is a new string... but here is the old one: ' + filtered;
});


var filterTest = 'This is the unfiltered string.';

actions.doAction('test', 'with data!');

console.log(filterTest);

filterTest = actions.applyFilter('testFilter', filterTest);

console.log(filterTest);

// filenamePattern: "../../build/js/$1.min.$2"

function ActionFilters() {
    this.actions = [];
    this.filters = [];

    this.pub = {
        parent: this,
        addAction: function(key, fn) {
            if (this.parent.actions[key] == undefined) {
                this.parent.actions[key] = [];
            }
            this.parent.actions[key].push(fn);
        },
        doAction: function(key, data) {
            if (this.parent.actions[key] != undefined) {
                this.parent.actions[key].forEach(function(fn) {
                    fn(data);
                });
            }
        },
        addFilter: function(key, fn) {
            if (this.parent.filters[key] == undefined) {
                this.parent.filters[key] = [];
            }
            this.parent.filters[key].push(fn);
        },
        applyFilter: function(key, filtered, data) {
            if (this.parent.filters[key] == undefined) {
                return filtered;
            }
            this.parent.filters[key].forEach(function(fn) {
                filtered = fn(filtered, data);
            });
            return filtered;
        }
    };

    return this.pub;
}

var ActionFilters = ActionFilters();

var addAction = function(key, fn) {
    ActionFilters.addAction(key, fn);
};

var doAction = function(key, data) {
    ActionFilters.doAction(key, data);
};

var addFilter = function(key, fn) {
    ActionFilters.addFilter(key, fn);
};

var applyFilter = function(key, filtered, data) {
    return ActionFilters.applyFilter(key, filtered, data);
};

if (exports) { // are we running in Node
    exports.addAction = addAction;
    exports.doAction = doAction;
    exports.addFilter = addFilter;
    exports.applyFilter = applyFilter;
} else {
    window.onload = function() {
        doAction('windowLoaded', window);
    };

    window.addEventListener("DOMContentLoaded", function() {
        doAction('documentReady');
    }, false);

    window.addEventListener("click", function(event) {
        doAction('mouseClicked', event);
    }, false);
}

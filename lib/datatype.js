var mersenne = require('../vendor/mersenne');

/**
 *
 * @namespace faker.datatype
 */
function Datatype (faker, seed) {
    // Use a user provided seed if it is an array or number
    if (Array.isArray(seed) && seed.length) {
        mersenne.seed_array(seed);
    }
    else if(!isNaN(seed)) {
        mersenne.seed(seed);
    }

    /**
     * returns a single random number based on a max number or range
     *
     * @method faker.datatype.number
     * @param {mixed} options {min, max, precision}
     */
    this.number = function (options) {

        if (typeof options === "number") {
            options = {
                max: options
            };
        }

        options = options || {};

        if (typeof options.min === "undefined") {
            options.min = 0;
        }

        if (typeof options.max === "undefined") {
            options.max = 99999;
        }
        if (typeof options.precision === "undefined") {
            options.precision = 1;
        }

        // Make the range inclusive of the max value
        var max = options.max;
        if (max >= 0) {
            max += options.precision;
        }

        var randomNumber = Math.floor(
            mersenne.rand(max / options.precision, options.min / options.precision));
        // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
        randomNumber = randomNumber / (1 / options.precision);

        return randomNumber;

    };

    /**
     * returns a single random floating-point number based on a max number or range
     *
     * @method faker.datatype.float
     * @param {mixed} options
     */
    this.float = function (options) {
        if (typeof options === "number") {
            options = {
                precision: options
            };
        }
        options = options || {};
        var opts = {};
        for (var p in options) {
            opts[p] = options[p];
        }
        if (typeof opts.precision === 'undefined') {
            opts.precision = 0.01;
        }
        return faker.datatype.number(opts);
    };

    /**
     * Similar to description of Date by MDN,
     * this method uses a random number of milliseconds since 1. Jan 1970 UTC to return a Date object
     *
     * @method faker.datatype.date
     */
    this.date = function () {
        var random = faker.datatype.number({ min: 0, max: 8600000000000000 });
        return new Date(random);
    };

    /**
     * uuid
     *
     * @method faker.datatype.uuid
     */
    this.uuid = function () {
        var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var replacePlaceholders = function (placeholder) {
            var random = faker.datatype.number({ min: 0, max: 15 });
            var value = placeholder == 'x' ? random : (random &0x3 | 0x8);
            return value.toString(16);
        };
        return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    };

    /**
     * boolean
     *
     * @method faker.datatype.boolean
     */
    this.boolean = function () {
        return !!faker.datatype.number(1)
    };


    /**
     * hexaDecimal
     *
     * @method faker.datatype.hexaDecimal
     * @param {number} count defaults to 1
     */
    this.hexaDecimal = function hexaDecimal(count) {
        if (typeof count === "undefined") {
            count = 1;
        }

        var wholeString = "";
        for(var i = 0; i < count; i++) {
            wholeString += faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
        }

        return "0x"+wholeString;
    };

    return this;

}

module['exports'] = Datatype;
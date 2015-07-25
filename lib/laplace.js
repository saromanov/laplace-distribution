"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

//https://en.wikipedia.org/wiki/Laplace_distribution

var Laplace = exports.Laplace = (function () {
    function Laplace(mu, b) {
        _classCallCheck(this, Laplace);

        this.mu = mu;
        this.b = b;
    }

    _createClass(Laplace, {
        CDF: {
            value: function CDF(x) {
                if (Number.isNaN(x)) {
                    return 0;
                }

                if (x < this.mu) {
                    return 0.5 * Math.exp((x - this.mu) / this.b);
                } else {
                    return 1 - 0.5 * Math.exp(-(x - this.mu) / this.b);
                }
            }
        },
        Mean: {
            value: function Mean() {
                return this.mu;
            }
        },
        Median: {
            value: function Median() {
                return this.mu;
            }
        },
        Var: {
            value: function Var() {
                return 2 * Math.pow(this.b, 2);
            }
        },
        Entropy: {
            value: function Entropy() {
                return 1 + Math.log(2 * this.b);
            }
        },
        compute: {
            value: function compute() {
                var _this = this;

                var n = arguments[0] === undefined ? 1 : arguments[0];

                if (n == 1) {
                    var x = random(this.mu, this.b);
                    return laplace_compute(x, this.mu, this.b);
                } else {
                    var xlist = random(this.mu, this.b, n = n);
                    return xlist.map(function (x) {
                        return laplace_compute(x, _this.mu, _this.b);
                    });
                }
            }
        },
        skewness: {
            value: function skewness() {
                return 0;
            }
        },
        sample: {
            value: function sample() {
                var x = random(this.mu, this.b) - 0.5;
                var ex = -2 * x;
                var scale = -this.b;
                if (x < 0) {
                    ex = 2 * x;
                    scale = this.b;
                }
                return this.mu + scale * Math.log(1 + ex);
            }
        }
    });

    return Laplace;
})();

//Generate random value
var random = (function (_random) {
    var _randomWrapper = function random(_x, _x2) {
        return _random.apply(this, arguments);
    };

    _randomWrapper.toString = function () {
        return _random.toString();
    };

    return _randomWrapper;
})(function (start, end) {
    var n = arguments[2] === undefined ? 1 : arguments[2];

    if (n <= 1) {
        return Math.random() * (end - start) + start;
    } else if (n > 1) {
        var result = [];
        for (var i = 0; i < n; ++i) {
            result.push(random(start, end));
        }
        return result;
    }
});

var laplace_compute = function laplace_compute(x, mu, sigma) {
    return 1 / (2 * sigma) * Math.exp(-Math.abs(x - mu) / sigma);
};

//https://en.wikipedia.org/wiki/Laplace_distribution
export class Laplace {
    constructor(mu, b){
        this.mu = mu;
        this.b = b;
    }

    CDF(x){
        if(Number.isNaN(x)){
            return 0;
        }

        if(x < this.mu) {
            return 0.5 * Math.exp((x - this.mu)/this.b);
        } else {
            return 1 - 0.5 * Math.exp(-(x-this.mu)/this.b);
        }
    }

    Mean(){
        return this.mu;
    }

    Median(){
        return this.mu;
    }

    Var(){
        return 2 * Math.pow(this.b,2);
    }

    Entropy(){
        return 1 + Math.log(2 * this.b);
    }

    //Return PDF
    compute(n=1){
        if(n == 1)
        {
            let x = random(this.mu, this.b);
            return laplace_compute(x, this.mu, this.b);
        } else {
            let xlist = random(this.mu, this.b, n=n);
            return xlist.map(x => laplace_compute(x, this.mu, this.b));
        }
    }

    skewness(){
        return 0;
    }

    //Sample from laplace distribution
    sample(n){
        let nums = random(0,1,n=n).map(x => x - 0.5);
        let value = this.b/Math.sqrt(2);
        let second = nums.map(x => value * sign(x) * Math.log(1 - 2 * Math.abs(x)));
        return second.map(x => this.mu - x); 
    }
}

//Generate random value
var random = function(start, end, n=1){
    if(n <= 1){
        return Math.random() * (end - start) + start;
    }
    else if(n > 1){
        let result = [];
        for(let i = 0;i < n;++i) {
            result.push(random(start, end));
        }
        return result;
    }
}

var laplace_compute = function(x, mu, sigma){
    return 1/(2 * sigma) * Math.exp(-Math.abs(x - mu)/sigma);
}

var sign = function(item) {
    if(item > 0) {
        return 1;
    }

    if(item < 0) {
        return -1;
    }

    return 0;
}


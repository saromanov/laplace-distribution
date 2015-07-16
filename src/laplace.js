
//https://en.wikipedia.org/wiki/Laplace_distribution
export class Laplace {
    constructor(mu, b){
        this.mu = mu;
        this.b = b;
    }

    CDF(x){
        if(Number.isNaN(x))
            return 0;
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

    compute(){
        let x = random(this.mu, this.b);
        return 1/(2 * this.b) * Math.exp(-Math.abs(x - this.mu)/this.b);
    }

    skewness(){
        return 0;
    }

    sample(){
        let x = random(this.mu, this.b)-0.5;
        let ex = -2 * x;
        let scale = -this.b;
        if (x < 0) {
            ex = 2 * x
            scale = this.b;
        }
        return this.mu + scale * Math.log(1+ex);
    }
}

//Generate random value
var random = function(start, end, n=1){
    if(n == 1){
        return Math.random() * (end - start) + start;
    }
}


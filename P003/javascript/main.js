(function() {
	'use strict';

  let primeNumbers = [2];

  function getQuotient(dividend, divisor) {
    return (dividend / divisor);
  }

  function isFactor(quotient) {
    return (Math.floor(quotient) === quotient);
  }

  function isPrime(num, primes) {
    let maxPrimesAvailable = Math.max.apply(null, primes);
    let prime;
    let cnt;
    // can use the existing array primes
    if (num <= maxPrimesAvailable) {
      for (cnt = 0; cnt < primes.length; cnt += 1) {
        prime = primes[cnt];
        if (prime === num) {
          return true;
        }
      }
      return false;
    }
    // is greater than the largest prime, see if any
    // of the existing primes are a factor
    for (cnt = 0; cnt < primes.length; cnt += 1) {
      prime = primes[cnt];
      if (isFactor(getQuotient(num, prime))) {
        return false;
      }
    }
    primes.push(num);
    return true;
  }

  function findPrimeFactors(numLocal, primeNumbersCache) {
    let maxfact = Math.floor(numLocal / 2);
    let primeFacts = [0, 1];
    // loop up to half of the number and find any prime factors
    for (let counter = 2; counter <= maxfact; counter += 1) {
      if (isPrime(counter, primeNumbersCache)) {
        let quot = getQuotient(numLocal, counter);
        let isFact = isFactor(quot);
        if (isFact) {
          primeFacts.push(counter);
        }
      }      
    }
    return primeFacts;
  }
  console.log('Prime factors of 4294967296 ' + JSON.stringify(findPrimeFactors(4294967296, primeNumbers)));
  console.log('Finished!');
}());
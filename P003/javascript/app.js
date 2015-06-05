(function() {
	'use strict';

  angular.module('projectEuler', ['ui.router']);

  angular
    .module('projectEuler')
    .config(function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider
        .otherwise('/');
        
      $stateProvider
        .state('home', {
          'url': '/',
          'template': '<div><h1 ng-bind="vm.title"></h1><p>{{vm.result}}</p></div>',
          'controller': 'homeController as vm'
        });
    });

  angular
    .module('projectEuler')
    .controller('homeController', function(eulerService) {
      var vm = this;
      
      vm.title = 'P003';
      vm.result = eulerService.findPrimeFactors(2458);
    });
    
  angular
    .module('projectEuler')
    .factory('eulerService', function() {
    
      function getQuotient(dividend, divisor) {
        return (dividend / divisor);
      }
    
      function isFactor(quotient) {
        return (Math.floor(quotient) === quotient);
      }
    
      function isPrime(num, primes) {
        var maxPrimesAvailable = Math.max.apply(null, primes);
        var prime;
        var cnt;
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
    
      function findPrimeFactors(numLocal) {
        var maxfact = Math.floor(numLocal / 2);
        var primeNumbersCache = [2];
        var primeFacts = [0, 1];
        // loop up to half of the number and find any prime factors
        for (var counter = 2; counter <= maxfact; counter += 1) {
          if (isPrime(counter, primeNumbersCache)) {
            var quot = getQuotient(numLocal, counter);
            var isFact = isFactor(quot);
            if (isFact) {
              primeFacts.push(counter);
            }
          }      
        }
        return primeFacts;
      }
      
      return {
        findPrimeFactors: findPrimeFactors
      };
    });
      
}());
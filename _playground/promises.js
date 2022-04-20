// Callback Refresher
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         // Example error: callback('This is my error!', undefined);
//         // Example Result
//         callback(undefined, [1, 2, 3, 4]);
//     }, 2000);
// };

// doWorkCallback((error, result) => {
//     // do something once we get the error or result comes back from original function
//     // needs conditional logic -- runs for failures and successes
//     if (error) {
//         // use return to stop function execution
//         return console.log(error);
//     }

//     console.log(result);
// });

//
// Promises
//
// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // instead of passing arg to the callback function to denote how the requestor should handle we have two functions
//         // success
//         // resolve([1, 2, 3, 4]);
//         // failure
//         reject('Things went wrong');
//         // cannot be called twice
//         reject('New error');
//         resolve([1, 2, 3, 4]);
//     }, 2000);
// });

// doWorkPromise
//     .then((result) => {
//         console.log('Success', result);
//     })
//     .catch((error) => {
//         console.log('Error', error);
//     });

//
//								fulfilled
//								/
//	Promise		-- pending -->
//								\
//								rejected
//

//
// Promise Chaining
//
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

// Similar issue to using callbacks --> nesting and duplicating code (e.g. error handling)
// add(1, 2)
//     .then((sum) => {
//         console.log(sum);

//         add(sum, 5)
//             .then((sum2) => {
//                 console.log(sum2);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// Chaining
add(1, 1)
    .then((sum) => {
        console.log(sum);
        return add(sum, 4);
    })
    .then((sum2) => {
        console.log(sum2);
    })
    .catch((error) => {
        console.log(error);
    });

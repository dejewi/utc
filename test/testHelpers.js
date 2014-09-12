/*exported successfulPromise*/
function successfulPromise() {
    'use strict';
    var theArguments = arguments;
    //noinspection ReservedWordAsName
    return {
        then: function (callback) {
            callback.apply(null, theArguments);
            return this;
        },
        catch: function () {
            return this;
        },
        finally: function (callback) {
            callback.apply(null, theArguments);
            return this;
        }
    };
}
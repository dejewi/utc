/*exported setupBackendMock*/
function setupBackendMock($httpBackend)
{
    'use strict';

    function decodeUriQuery(val, pctEncodeSpaces)
    {
        val = val.replace(/@/gi, '%40').replace(/:/gi, '%3A').replace(/\$/g, '%24').replace(/,/gi, '%2C');
        if (pctEncodeSpaces) {
            val = val.replace(/\+/g, '%20');
        }
        return decodeURIComponent(val);
    }

    function decodeUriSegment(val)
    {
        return decodeUriQuery(val, true).replace(/&/gi, '%26').replace(/=/gi, '%3D').replace(/\+/gi, '%2B');
    }

    var sequence = 1;
    var testSequence = 1;
    var tasks = {};
    [
        {id: sequence++, title: 'Configure AngularJS routing', description: 'Some Details', repository_url: 'https://github.com/aniaw/angular-exercises.git', branch_name: 'exercise1', assign_to: ['test1', 'test2'], tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Bind Posts', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Bind Posts From DAO', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Implement DAO', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Creating own DAO resource', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Create CRUD', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Using angular-xeditable', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Typeahead component', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Multilanguage using angular-gettext', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Drag and Drop', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Pagination Support', description: 'Some Details', tags: ['tag1', 'tag2']},
        {id: sequence++, title: 'Configure backend mocking', description: 'Some Details', tags: ['tag1', 'tag2']}
    ].every(function (value) {
            tasks[value.id] = value;
            return true;
        });

    var tests = {};
    [
        {id: testSequence++, title: 'Angular awesome tests', description: loremIpsum(3), taskNo: 150},
        {id: testSequence++, title: 'JavaScript great tests', description: loremIpsum(3), taskNo: 50},
        {id: testSequence++, title: 'Other tests 1', description: loremIpsum(3), taskNo: 45},
        {id: testSequence++, title: 'Other tests 2', description: loremIpsum(3), taskNo: 40},
        {id: testSequence++, title: 'Other tests 3', description: loremIpsum(3), taskNo: 35},
        {id: testSequence++, title: 'Other tests 4', description: loremIpsum(3), taskNo: 30},
        {id: testSequence++, title: 'Other tests 5', description: loremIpsum(3), taskNo: 25},
        {id: testSequence++, title: 'Other tests 6', description: loremIpsum(3), taskNo: 20},
        {id: testSequence++, title: 'Other tests 7', description: loremIpsum(3), taskNo: 15},
        {id: testSequence++, title: 'Other tests 8', description: loremIpsum(3), taskNo: 10},
        {id: testSequence++, title: 'Other tests 9', description: loremIpsum(3), taskNo: 5},
        {id: testSequence++, title: 'Other tests 10', description: loremIpsum(3), taskNo: 3},
        {id: testSequence++, title: 'Other tests with really really really really really really really long title, I dont now for what... 11',
            description: loremIpsum(3), taskNo: 1}
    ].every(function (value)
            {
                tests[value.id] = value;
                return true;
            });

    function loremIpsum(sentencesCount)
    {
        var sentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus quis felis et posuere. ' ,
            'Pellentesque volutpat ac mauris quis consectetur. Donec mollis tortor malesuada accumsan pulvinar. ' ,
            'Aenean faucibus semper magna. Ut id dictum libero. Etiam viverra diam nec sem pellentesque malesuada. ' ,
            'Quisque semper suscipit rutrum. Mauris a mollis purus, sit amet egestas tellus. ' ,
            'Nullam vel mauris id metus vestibulum vestibulum non non tortor. Vivamus ut congue sapien, in lobortis orci. ' ,
            'Sed iaculis metus eget erat venenatis, id vestibulum massa scelerisque. ' ,
            'Phasellus magna mi, vestibulum quis massa in, laoreet dignissim augue. ' , 'Cras nunc leo, pellentesque sit amet interdum nec, pretium quis magna.'
        ];

        var result = '';
        for (var i = 0; i < sentencesCount; i++) {
            var index = Math.min(sentences.length - 1, Math.round(Math.random() * sentences.length));
            result += sentences[index];
        }
        return result;
    }

    function parseQueryString(url)
    {
        var args = url.split('?');
        args = args[1] || args[0];
        args = args.split('&');
        var result = {};
        var arg;
        for (var i = 0; i < args.length; i++) {
            arg = decodeURI(args[i]);

            if (arg.indexOf('=') == -1) {
                result[arg.trim()] = true;
            } else {
                var kvp = arg.split('=');
                result[kvp[0].trim()] = kvp[1].trim();
            }
        }
        return result;
    }

    $httpBackend.whenGET(/\/api\/task(\?.*)$/).respond(function (method, url)
    {
        var params = parseQueryString(url);
        var first = parseInt(params.firstResult);
        var max = parseInt(params.maxResults);

        var count = 0;
        var result = [];
        var searchString = params.searchQuery ? decodeUriSegment(params.searchQuery).toLowerCase() : params.searchQuery;
        angular.forEach(tasks, function (task)
        {
            if (task && ( !params.searchQuery || -1 < task.title.toLowerCase().indexOf(searchString))) {
                if ((count >= first) && (count < first + max)) {
                    result.push(task);
                }
                count++;
            }
        });
        return [200, {resultList: result, resultCount: count}];
    });

    $httpBackend.whenGET(/\/api\/test(\?.*)$/).respond(function (method, url)
    {
        var params = parseQueryString(url);
        var first = parseInt(params.firstResult);
        var max = parseInt(params.maxResults);

        var count = 0;
        var result = [];
        var searchString = params.searchQuery ? decodeUriSegment(params.searchQuery).toLowerCase() : params.searchQuery;
        angular.forEach(tests, function (test)
        {
            if (test && ( !params.searchQuery || -1 < test.title.toLowerCase().indexOf(searchString))) {
                if ((count >= first) && (count < first + max)) {
                    result.push(test);
                }
                count++;
            }
        });
        return [200, {resultList: result, resultCount: count}];
    });

    $httpBackend.whenGET(/\/api\/test\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/api\/test\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            return [200, tests[id]];
        }
        return [404];
    });

    $httpBackend.whenDELETE(/\/api\/test\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/api\/test\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            delete tests[id];
            return [200];
        }
        return [404];
    });

    $httpBackend.whenPOST(/\/api\/test$/).respond(function (method, url, testData)
    {
        testData = JSON.parse(testData);

        if (tests[testData.id]) {
            tests[testData.id].title = testData.title;
        } else {
            testData.id = testSequence++;
            tests[testData.id] = testData;
        }

        return [200, testData];
    });

    $httpBackend.whenGET(/\/api\/test\/\d+\/task/).respond(function (method, url)
    {
        var params = parseQueryString(url);
        var first = parseInt(params.firstResult);
        var max = parseInt(params.maxResults);

        var count = 0;
        var result = [];
        var searchString = params.searchQuery ? decodeUriSegment(params.searchQuery).toLowerCase() : params.searchQuery;
        angular.forEach(tasks, function (task)
        {
            if (task && ( !params.searchQuery || -1 < task.title.toLowerCase().indexOf(searchString))) {
                if ((count >= first) && (count < first + max)) {
                    result.push(task);
                }
                count++;
            }
        });
        return [200, {resultList: result, resultCount: count}];
    });

    $httpBackend.whenDELETE(/\/api\/test\/\d+\/task\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/api\/test\/\d+\/task\/(\d+)$/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            delete tasks[id];
            return [200];
        }
        return [404];
    });

    $httpBackend.whenGET(/\/api\/task\/(\d+)/).respond(function (method, url) {
        var match;
        match = /\/api\/task\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            return [200, tasks[id]];
        }
        return [404];
    });

    $httpBackend.whenPOST(/\/api\/task$/).respond(function (method, url, json_params) {
        var task = JSON.parse(json_params);
        var id;
        if (task.hasOwnProperty('id')) { // update
            id = task['id'];
            tasks[id] = task;
            return [200, tasks[id]];
        } else { // create
            task['id'] = sequence++;
            tasks[task.id] = task;
            return [200, tasks];
        }
    });

    $httpBackend.whenDELETE(/\/api\/task\/(\d+)/).respond(function (method, url) {
        var match = /\/api\/task\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            delete tasks[id];
            return [200];
        }
        return [404];
    });

    $httpBackend.whenPOST(/\/api\/trial$/).respond(function (method, url, json_params)
    {
        var trial = JSON.parse(json_params);
        console.log('now, backend push email to sending queue');
        return [200, trial];
    });

    $httpBackend.whenGET(/.*\.html/).passThrough();
}

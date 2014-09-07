/*exported setupBackendMock*/
function setupBackendMock($httpBackend)
{
    'use strict';

    $httpBackend.whenGET(/\/api\/task(\?.*)$/).respond({
        resultList: [
            {id: 1, title: 'Configure AngularJS routing'},
            {id: 2, title: 'Implement DAO'},
            {id: 3, title: 'Configure backend mocking'}
        ],
        resultCount: 30
    });

    $httpBackend.whenGET(/.*\.html/).passThrough();

}

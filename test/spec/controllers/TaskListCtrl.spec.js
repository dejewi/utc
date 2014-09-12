describe('TaskListCtrl', function ()
{
    'use strict';

    var controller;
    var TaskDAOMock;
    var queryResponseA;
    var queryResponseB;

    function createControler($controller)
    {
        controller = $controller('TaskListCtrl', {TaskDAO: TaskDAOMock});
    }

    beforeEach(module('utcApp'));

    beforeEach(function ()
    {
        TaskDAOMock = jasmine.createSpyObj('TaskDAO', ['query']);
        queryResponseA = {
            resultList: [
                {id: 1},
                {id: 2}
            ]
        };
        queryResponseB = {
            resultList: [
                {id: 3},
                {id: 4}
            ],
            resultCount: 40
        };
        TaskDAOMock.query.andReturn(successfulPromise(queryResponseA));
    });
    describe('constructor', function ()
    {
        beforeEach(inject(function ($controller)
        {
            createControler($controller);
        }));
        it('should load tasks', function ()
        {
            expect(controller.list).toEqual(queryResponseA.resultList);
        });
        it('should make isPaginationNeeded return false', function ()
        {
            expect(controller.isPaginationNeeded()).toBe(false);
        });
        describe('when search query is typed', function ()
        {
            beforeEach(inject(function ($rootScope)
            {
                TaskDAOMock.query.andReturn(successfulPromise(queryResponseB));
                $rootScope.$digest();
                controller.filter.searchQuery = 'abc';
                $rootScope.$digest();
            }));
            it('should reload the results', function ()
            {
                expect(controller.list).toEqual(queryResponseB.resultList);
            });
            it('should call DAO with proper filters', function ()
            {
                expect(TaskDAOMock.query).toHaveBeenCalledWith({searchQuery: 'abc', maxResults: 5, firstResult: 0 });
            });
        });
        describe('when moving to next page', function ()
        {
            beforeEach(inject(function ($rootScope)
            {
                TaskDAOMock.query.andReturn(successfulPromise(queryResponseB));
                $rootScope.$digest();
                controller.currentPage = 2;
                $rootScope.$digest();
            }));
            it('should load next results', function ()
            {
                expect(TaskDAOMock.query).toHaveBeenCalledWith({searchQuery : null, maxResults : 5, firstResult : 5});
            });
        });

    });
    describe('constructor', function ()
    {
        beforeEach(inject(function ($controller)
        {
            TaskDAOMock.query.andReturn(successfulPromise(queryResponseB));
            createControler($controller);
        }));
        it('should load tasks', function ()
        {
            expect(controller.list).toEqual(queryResponseB.resultList);
        });
        it('should make isPaginationNeeded return true', function ()
        {
            expect(controller.isPaginationNeeded()).toBe(true);
        });
    });
});

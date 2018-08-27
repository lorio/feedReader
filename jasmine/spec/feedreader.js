/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty, and that it has properties name and url defined.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('url are defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });
        it('have names', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('Menu', function() {
        const body = document.querySelector('body');
        const menuIcon = document.querySelector('.menu-icon-link');
       // menuOpen = body.classlist
        /* menu element should be hidden by default.*/
        it('is hidden', function() {
            expect(body.classList).toContain('menu-hidden');
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility', function(){
            menuIcon.click();
            expect(body.classList).not.toContain('menu-hidden');
            menuIcon.click();
            expect(body.classList).toContain('menu-hidden');
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
       const feed = document.querySelector('.feed');
        
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach((done) => {
            loadFeed(0, done);        
         })
         it('contains an entry', () => {
            expect(feed.children.length).toBeGreaterThan(0);
         })
     });
    /* A New feed loads new content */
    describe('New Feed Selection', function() {
       // const feed = document.querySelector('.feed');
        let entry1, entry2;
        
        beforeEach((done) => {
            loadFeed(0, () => {
                entry1 = document.querySelector('.entry').innerText;
                 console.log(entry1);
                 done()  
                loadFeed(1, () => {
                    entry2 = document.querySelector('.entry').innerText;
                    console.log(entry2);
                    done()
                }); 
            });   done();              
        });
            it('loads new content', ((done) => {
                expect(entry1).not.toEqual(entry2);
                done();
           })); 
        
    });
}());

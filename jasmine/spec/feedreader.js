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
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This is a test that loops through each feed
     * to check that it has a URL.
     */
     it('urls are defined and not empty', function() {
      for(let item of allFeeds) {
        expect(item.url).toBeTruthy();
      };
     });


    /* This is a test that loops through each feed 
     * to check that it has a name.
     */
     it('names are defined and not empty', function() {
      for(let item of allFeeds) {
        expect(item.name).toBeTruthy();
      };
     });
  });


  /* A test suite for the menu */
   describe('The menu', function() {
    const body = $('body');

    /* This is a test that checks that the menu element is
     * hidden by default.
     */
    it('menu is hidden', function() {
      expect($('body').hasClass("menu-hidden")).toBe(true);
    });

     /* This is a test that checks to make sure the menu changes
      * visibility when the menu-icon-link is clicked.
      */
    it('menu visibility changes when menu icon is clicked', function() {
      let menuIcon = $('.menu-icon-link');

      menuIcon.click();
      expect($('body').hasClass("menu-hidden")).not.toBe(true);

      menuIcon.click();
      expect($('body').hasClass("menu-hidden")).toBe(true);
    });

   });

  /* A test suite for initial entries */
  describe('Initial Entries', function() { 

    /* This is a test that checks for when the loadFeed
     * function is called that it completes its work, 
     * then checks that at least one .entry element is
     * within the .feed container.
     */
    let entryCount = 0;

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('loadFeed has completed and has data', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });

  });

  /* A test suite for New Feeds */
  describe('New Feed Selection', function() {

    /* This is a test that runs when a new feed is loaded
     * by the loadFeed function, and checks that the new
     * content is different than the previous content.
     */
    let feed0, feed1;

    beforeEach(function(done){
      loadFeed(0, function(){
        feed0 = document.querySelector('.feed').innerHTML;

        loadFeed(1, function(){
          feed1 = document.querySelector('.feed').innerHTML;
          done();
         });
       });
    });

    it('loadFeed has loaded a new feed and has new data', function() {
      expect(feed0).not.toEqual(feed1);
    });

  });
}());

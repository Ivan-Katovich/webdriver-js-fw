

Feature: Test
  As a user
  I test webdriverJS api
  Test should work.

  @test
  Scenario: Test1
    When I navigate to page
    When I say 'Hello World!!!'
    When I sleep for '2' sec and quit driver

  @test
  Scenario: Test2
    When I navigate to page
    When I sleep for '2' sec and quit driver
    When I say 'Hello World!!!'
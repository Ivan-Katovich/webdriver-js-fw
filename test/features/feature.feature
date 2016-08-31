Feature: Test
  As a user
  I test webdriverJS api
  Test should work.

  @test
  Scenario: Test1
    When I navigate to page
    When I say 'Hello World!!!'
    Then first number '2' equals to second number '3'
    When I sleep for '2' sec and quit driver

  @test
  Scenario: Test2
    When I navigate to page
    Then first number '2' equals to second number '2'
    When I sleep for '2' sec and quit driver
    When I say 'Hello World!!!'
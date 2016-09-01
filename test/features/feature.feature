Feature: Test spec
  As a user
  I test webdriverJS api
  First test should be failed.

  @test
  Scenario: Test1 scenario
    When I navigate to page
    When I say 'Hello Paradise!!!'
    Then first number '2' equals to second number '3'
    When I sleep for '2' sec and quit driver

  @test
  Scenario: Test2 scenario
    When I navigate to page
    Then first number '2' equals to second number '2'
    When I sleep for '2' sec and quit driver
    When I say 'Hello Hell!!!'
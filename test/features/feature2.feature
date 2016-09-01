Feature: Test spec2
  As a user
  I test webdriverJS api and parallel report
  Test should work.

  @test
  Scenario: Test1 scenario alt
    When I navigate to page
    When I say 'Hello World!!!'
    Then first number '4' equals to second number '4'
    When I sleep for '2' sec and quit driver

  @test
  Scenario: Test2 scenario alt
    When I navigate to page
    Then first number '7' equals to second number '7'
    When I sleep for '2' sec and quit driver
    When I say 'Hello Sky!!!'
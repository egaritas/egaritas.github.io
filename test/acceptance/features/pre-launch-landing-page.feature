Feature: Pre-Launch Landing Site

In order to test customer demand before even building a minimum viable product, create a sort of minimum viable product to test and validate our product/service idea.

  Background: 
    Given I visit the Pre-Launch website
     When The page has completed loading
  
  Scenario: Landing page should be branded with Egaritas brand
     Then I should see the Egaritas logo
      And I should see the Egaritas strap line "Learning Never Stops"
  
  Scenario: Landing page has Mailing list signup form
     Then I should see a mailing list signup form
  
  Scenario: Mailing list signup form has email form field
      And I can see the mailing list signup form
     Then the form has email input field
      And the email field has placeholder text "Email Address"
  
  Scenario: Mailing list signup form has submit form button
      And I can see the mailing list signup form
     Then the form has submit button
      And the submit button has value text "Subscribe"
  
  Scenario: Mailing list signup without an email address
    Given I can see the mailing list signup form
     When I have not entered an email address
      And I pressed the submit button
     Then I am presented with an error message "A valid email address must be provided."
  
  Scenario: Mailing list signup with a valid email address
    Given I can see the mailing list signup form
     When I have entered a valid email address
      And I pressed the submit button
     Then I am presented with "Submitting..." progress indicator
      And on successful submission I am presented with "Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you."
  
  Scenario: Mailing list signup with an invalid email address
    Given I can see the mailing list signup form
     When I have entered an invalid email address
      And I pressed the submit button
     Then I am presented with "Submitting..." progress indicator
      And on successful submission I am presented with an error message "A valid email address must be provided."
  
  Scenario: Mailing list signup with a previously subscribed email address
    Given I can see the mailing list signup form
     When I have entered a previously subscribed email address
      And I pressed the submit button
     Then I am presented with "Submitting..." progress indicator
      And on successful submission I am presented with an error message "You're already subscribed. Thank you."
  
  Scenario: Mailing list signup with same email address repeatedly
    Given I can see the mailing list signup form
     When I have entered a previously entered email address in the last few minutes
      And I pressed the submit button
     Then I am presented with "Submitting..." progress indicator
      And on successful submission I am presented with an error message "Sorry. Unable to subscribe. Please try again later."
  
  

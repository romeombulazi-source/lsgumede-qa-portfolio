# lsgumede-qa-portfolio
QA Automation Portfolio - LS Gumede Attorneys Website
*//What Is This Project?
This is an automated testing project for the LS Gumede Attorneys website — a law firm based in Durban that handles cases like Road Accident Fund claims, medical negligence and family law.
I built automated tests that open the website in a real browser, click through it, fill in forms, and check that everything works the way it should — all without me having to do it manually every time.*//

Folder Structure
lsgumede-qa-portfolio/
├── pages/
│   ├── HomePage.js          # Everything about the homepage
│   ├── NavigationPage.js    # Everything about the menu links
│   └── ContactPage.js       # Everything about the contact form
├── tests/
│   ├── homepage.test.js     # Tests for the homepage
│   ├── navigation.test.js   # Tests for the menu
│   └── contact.test.js      # Tests for the contact form
├── playwright.config.js     # Settings for how tests run
├── package.json
└── README.md

How I Structured the Code — Page Object Model
I used a pattern called the Page Object Model (POM). The idea is simple — instead of writing the same instructions over and over in every test, I created one file per page that describes everything about that page. Then all my tests just borrow from those files.
Think of it like a contact directory — instead of everyone memorising every phone number, there's one place everyone looks it up from.
Example of how it works:
javascript// ContactPage.js holds all the selectors and actions
const contactPage = new ContactPage(page);
await contactPage.navigate();
await contactPage.fillForm('Test User', 'test@email.com', '0821234567', 'Test message');

// contact.test.js just checks the results
await expect(contactPage.fullNameField).toHaveValue('Test User');

What I Tested
Homepage (3 tests)
Test What It Checks Result Homepage loads Does the page open without errors✅ Pass Page title Is the browser title correct✅ Pass Navigation menu Is the menu showing on the page✅ Pass
Navigation (3 tests)
Test What It Checks Result About page Does clicking About take you to the right page✅ Pass Services section Does clicking Services show the services content✅ Pass Contact page Does clicking Contact take you to /contact✅ Pass
Contact Form (5 tests)
Test What It Checks Result Form is visible Does the form show up on the page✅ Pass All fields present Are all the fields there (Name, Email, Phone etc.)✅ Pass Fields accept input Can you type into the fields and does it save correctly✅ Pass Service drop down Does the drop down button open when clicked✅ Pass Submit button Is the send button ready to be clicked✅ Pass
Total: 11 tests running across 3 browsers = 33 test runs

Browsers Tested
Browser Type Chrome Desktop,Firefox Desktop, Pixel 5 Mobile

Things I Found While Testing
These are real issues I discovered while building and running the tests:
1. Services doesn't go to a new page
When you click Services in the menu, the URL stays the same — the page just scrolls down. I only found this when my tests kept failing because the URL wasn't changing. I had to update the tests to check for visible content instead of a URL change.
2. Two navigation menus exist
The website actually has two nav menus in the code — one for desktop and one for mobile. This caused my tests to fail because the browser found both and didn't know which one to use. I fixed it by telling the test to always use the first one.
3. The "Service Needed" dropdown is not a normal dropdown
Most dropdowns are a standard HTML element that's easy to work with in tests. This one is built with React and behaves differently. I had to change my approach and test it as a button instead.
4. A loading screen blocks the page on first load
The website shows a full-screen loading animation when it first opens. On Firefox and Mobile this was still visible when my tests tried to click things, causing failures. I added code to wait for it to disappear before doing anything else.
5. The website is sometimes slow to load
When running tests across multiple browsers back to back, the website sometimes took too long to respond. This isn't a code problem — the website's server is just slow sometimes. I increased the timeout settings and added small pauses between tests to handle this.

How to Run These Tests Yourself
What you need first

Node.js installed
Git installed

Setup
bashgit clone https://github.com/romeombulazi-source/lsgumede-qa-portfolio.git
cd lsgumede-qa-portfolio
npm install
npx playwright install
Run everything
bashnpx playwright test
Run one file at a time
bashnpx playwright test tests/homepage.test.js
npx playwright test tests/navigation.test.js
npx playwright test tests/contact.test.js
Watch the browser as tests run
bashnpx playwright test --headed
See the results report
bashnpx playwright show-report

Tools Used
What I Used It For Playwright Writing and running the automated testsNode.js Running JavaScript on my computer VS Code Writing the code GitHub Desktop Saving and uploading my work Browser DevTools Inspecting the website's HTML to find the right elements

Portfolio project by Sbonelesihle Romeo Khumalo — Junior QA Engineer
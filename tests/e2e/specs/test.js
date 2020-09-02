// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
    'Header test': browser => {
        const test = browser.globals.globals

        browser
            .url('http://localhost:8080/2017/01')
            .waitForElementVisible('#app')
            .assert.elementPresent('.container')
            .assert.elementPresent('header.calendar-header span')
            .assert.containsText('header.calendar-header span', 'January 2017')
            .assert.elementPresent('button.prev')
            .assert.elementPresent('button.next')
            .click('button.prev')
            .pause(1000)
            .assert.urlEquals('http://localhost:8080/2016/12')
            .assert.containsText('header.calendar-header span', 'December 2016')
            .click('button.next')
            .assert.urlEquals('http://localhost:8080/2017/01')
            .assert.containsText('header.calendar-header span', 'January 2017')
            .end()
    },

    'Calendar link test': browser => {
        browser
            .url('http://localhost:8080/2017/01')
            .waitForElementVisible('#app')
            .pause(1000)
            .assert.elementPresent('.movies')
            .assert.elementPresent('.item:nth-child(3) .movies')
            .assert.containsText('.item:nth-of-type(3) .movies .movies__item', 'The Adventures of Potato')
            .click('.item:nth-child(3) .movies')
            .pause(1000)
            .assert.urlEquals('http://localhost:8080/2017/01/01')
            .assert.elementPresent('.details')
            .assert.containsText('.details .movie-id', 'ID: 5d3a0f27-d422-4629-ac5a-84732e248be5')
            .assert.containsText('.details .title', 'The Adventures of Potato')
            .assert.containsText('.details .date', 'January 01, 2017')
            .assert.elementPresent('.details .link a')
            .click('.details .link a')
            .pause(1000)
            .assert.urlEquals('http://localhost:8080/2017/01')
            .end()
    }
}

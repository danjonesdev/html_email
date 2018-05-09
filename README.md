# html_email
HTML email template based on best practices

## Tools

Make sure to inline all your styles prior to sending:
https://templates.mailchimp.com/resources/inline-css/

CSS email support:
https://www.campaignmonitor.com/css/

CSS email tips:
https://www.queness.com/post/8784/12-killer-tips-and-tricks-for-building-html-email

Send test emails free:
https://putsmail.com/tests/b21452c2-9ea5-4e45-b189-430a0c5a1a55

Frontend build system for internal use.

## Setup

You'll need the latest versions of the following installed on your system:

* [Node.js](https://nodejs.org/en/)
* [Gulp](http://gulpjs.com/)

Once your system is setup with the above, navigate to the cloned repo and install project dependencies:

```javascript
npm install
```

In ```package.json``` there is a list of base paths for source, build and distribution directories. By default it is setup for a static web build but you can change the paths as needed, for example to reflect a WordPress theme directory ```./public/wp-content/themes/mosquito/static```

## Project Tasks

The following Gulp task launches a local server via BrowserStack that will watch for any changes to your assets and automatically compile as well as refreshing your browser:

```javascript
gulp watch
```

You can compile any templates, js and css and copy static assets by running the build script:

```javascript
npm run build
gulp build
```

```javascript
gulp clean
```

Make sure to then run the ```gulp build``` task to rebuild all the required assets.

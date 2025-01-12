# adapt-homeButton-url

Add home button to course navigation. Allows hide or redirect of home button. Allows hide of back button. Added functionality of home button to direct to a URL.

## Settings

All configuration options must be added and amended, where appropriate, for all json files.

#### Config

**\_homeButton** (object): The config.json Home Button target attribute object.

>**\_isEnabled** (boolean): Controls whether the Home Button extension is enabled or not.

#### Course

**\_homeButton** (object): The course.json Home Button target attribute object.

>**\_isEnabled** (boolean): Controls whether the Home Button course object is enabled or not.

>**\_hideHomeButton** (boolean): Controls whether the navigational home button is hidden or not.

>**\_redirectToId** (string): Define the page ID that the home button should direct the user to in case an override to the standard behaviour is required.

>**alt** (string): This text becomes the global home buttons's aria label attribute.

#### ContentObject

**\_homeButton** (object): The contentObject.json Home Button target attribute object.

>**\_isEnabled** (boolean): Controls whether the Home Button contentObject object is enabled or not.

>**\_hideHomeButton** (boolean): Controls whether the navigational home button is hidden or not.

>**\_hideBackButton** (boolean): Controls whether the navigational back button is hidden or not.

>**\_redirectToId** (string): Define the page ID that the home button should direct the user to in case an override to the standard behaviour is required.

----------------------------

**Framework versions:**  5+<br>
**Author / maintainer:**  CGKineo<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera<br>

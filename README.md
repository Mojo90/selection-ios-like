# iOS like Selection Pop-Up (Action Sheet) for Mobile/Web-Apps
by [Moritz Pfeiffer](https://www.xing.com/profile/Moritz_Pfeiffer9)

## 0. Index

1. [Description](#1-description)
2. [Screenshot](#2-screenshot)
3. [Usage](#3-usage)
4. [Example](#4-example)
5. [Notes](#5-notes)
6. [License](#6-license)

## 1. Description

This Repo gives you the possibility to easily add an iOS like Selection Pop-Up on the bottom of the Screen to any Javascript Application (Mobile and Web).
I have searched for that but didn't find a quick solution so I did it on my own. It was important to me that it has a look and feel like the native Selection Pop-Up and it should be easily to import in any project.

## 2. Screenshot

 iOS

<img src="https://raw.githubusercontent.com/Mojo90/selection-ios-like/master/screenshots/iOS1.png" width="235" height="417"/>&nbsp;
<img src="https://raw.githubusercontent.com/Mojo90/selection-ios-like/master/screenshots/iOS2.png" width="235" height="417"/>&nbsp;

## 3. Usage

Import the file:
```html
<script src="lib/selectioniOSLike.js"></script>
```
Show the Pop-Up with:
```javascript
selectioniOSLike(array, headerText);
```
Where `array` holds the Object-Buttons and `headerText`is an optional Text above the Selection-Buttons.

## 4. Example

```javascript
selectioniOSLike(
  [
    {
      name     : "Logout",
      onclick  : logout,
      color    : "red"
    }
  ], 
  "Do you really want to logout?"
);
```

## 5. Notes

1. Array
  - The array must conform to this: Object, Object, Object, ... but can have 0 - n items.
  - The order of the objects is as follows: 1. top, 2. middle, 3. bottom. The Cancel-Button is automatically added.
2. Object:

        var object = {
          name = "Edit", // The name for the Button
          onclick = function(){console.log("clicked");}, // the Click-Handler. Normally a function --> what should be executed on click at this button
          color = "white" // optional color of the text. Standard is the iOS blue.
        }
3. Cancel-Button
  - The Cancel object on bottom of the Screen is standard (just dismissing the selection)
  - Also if one tap on the black screen above the selection the pop up will be dismissed --> iOS behavior
  - Localization of Cancel Text can be done in `generateCancelButton`. Just replace the Command `LocalStrings.cancel` with Localization.
4. jquery is a must due to the animation
5. `headerText` is optional and can have approximate 40 characters (so that text is not broken in new line even on small phones)
6. With `selectioniOSLikeShown` can be detected if the pop up is shown or not. True --> is shown, False --> not shown.

## 6. License

[The MIT License (MIT)](http://www.opensource.org/licenses/mit-license.html)

Copyright (c) 2015-2016 Moritz Pfeiffer | DevelApp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

<h1 align="center">
  COOK BOOK
</h1>

<h1 align="center"> Testing </h1>

[Main README.md file](README.md "Link to README file")

[View live project](http://coock-book-ci-msp3.herokuapp.com/home "Link to Live project")

[View website in GitHub Pages](https://github.com/PerkunasKF/coock-book_CI-MPS3-3.0 "Link to Blank! Repository")

***
## Table of contents
1. [Testing User Stories](#Testing-User-Stories)
2. [Manual Testing](#Manual-Testing)
3. [Automated Testing](#Automated-Testing) 
     - [Code Validation](#Code-Validation)
     - [Browser Validation](#Browser-Validation)
     - [Lighthouse Auditing](#Lighthouse-Auditing)
4. [User Testing](#User-Testing)

***

![Blank! Responsiveness](assets/img/am-i-resposive-2.png)

***
## Testing User Stories

#### User Goals:
1. As a user I am looking for a place to find new recipes.
    - After entering the page user can see suggested recipes on the recipe carousel.
    - The user can go to the recipe catalog just by clicking the recipe link on the navigation bar.
    - The catalog contains all recipes, breakfast, lunch and dinner sections so the user can easily find what they want.
    - The recipe page contains a search feature for the user to find a specific recipe.
2. As a user I am looking for a place to write down their own recipes.
    - On user profile page user can find add recipe button to add any recipe they want.
    - After clicking the add recipe page a forum page opens for adding the recipe. The form separates recipe name, ingredients, descriptions and add recipe image.
3. As a user I am looking for an intuitive interface.
    - Navigation bar is easy to find on top of the page with all the links.
    - Clicking on any recipe or product will pop up a modal with the descriptions of the recipe or modal.
    - Navigations for products or recipes in catalog pages are easy to understand and find.
    - Adding recipe or product is intuitively understood.
    - Editing recipes or products is intuitively understood.
    - Editing the profile image or password is marked on the profile page with an edit icon.
    - The footer contains home link in a shape of the page logo also links to the social pages in social pages icons.
4. As a user I am looking to find some products to use on their recipes.
    - After entering the page user can find a carousel with new products for sale.
    - The product page contains a catalog of all products for sale. Product catalog is separated into three groups: all products, utensils and pots & pans.
    - Product page contains a search feature for users to find something specific.

[Back to top ⇧](#table-of-contents)

## Manual Testing
- Clicking or hovering on the links on the navigation bar will change the link's appearance:



- Clicking the hovering over interactive elements will change the cursor and the button styles:

    ![Hovering over the elements](assets/gif/cursor-change-2.gif)

- Clicking the **Reset Button** will reset current game: 

    ![Clicking Reset Button](assets/gif/reset-game-2.gif)

- Clicking **Tutorial Button** will pop up tutorial explanations:

    ![Clicking Tutorial Button](assets/gif/tutorial-2.gif)

- Playing on a classic mode game will show the same pattern and will make it longer:

    ![Classic Game Mode](assets/gif/classic-2.gif)
    
- Playing on extreme mode game patter will be random and will keep getting longer:

    ![Extreme Game Mode](assets/gif/extreme-2.gif)
    
- Clicking on **High Score Button** will make a high score board to pop up:

    ![High Score Board](assets/gif/high-score-2.gif)
    
- Clicking on **Feedback Button** will make feedback form to pop up:

    ![High Score Board](assets/gif/feedback-2.gif)

[Back to top ⇧](#table-of-contents)

## Automated Testing

### Code Validation

#### [W3C Markup Validator](https://validator.w3.org/ "Link to W3C Markup Validator") was used to validate the `HTML` code used:

**Result:**

![Page HTML Validation Results](assets/validation/HTML-validation.png)

#### [W3C CSS Validator](https://jigsaw.w3.org/css-validator/ "Link to W3C CSS Validator") was used to validate the `CSS` code used:

**Result:**

![CSS Validation Results](assets/validation/CSS-validation.png)

#### [JSHint](https://jshint.com/ "Link to JSHint") was used to validate the `JavaScript` and `JQuery` code used:

**Results:**

- There were no errors for:
    - `sendEmail.js`

- The warrning for `color-game.js` :

    ![Warning declared in JSHint](assets/validation/js-warning.png)
    
### Lighthouse Auditing

![Lighthous Validation](assets/validation/lighthouse.png)

[Back to top ⇧](#table-of-contents)

## User testing 
Family members and friends, also mentor, Seun Owonikoko, were asked to review the site and documentation to point out any bugs and/or user experience issues. 

It was through this testing that the following changes were made:
- Added extreme mode.
- The sound was added to the color blinks.
- Graphic design was remade.
- More clearly defined modes and buttons.

[Back to top ⇧](#table-of-contents)
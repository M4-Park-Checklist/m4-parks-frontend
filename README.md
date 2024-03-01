## 💭 Abstract
NPS Service is an app designed to let you view all of the national parks in the country at a glance, as well as check off the ones you have visted. You can filter the parks down by state and doing so lets you see more park info! we have a lot of room to grow and implement more on this app, so this is just the first stage of development.

## 💻 Installation instructions
1. Open project on Github
2. Clone down the repo
3. cd into the repo and run `npm install`
4. Run npm start
5. When the window opens, you should have access to a checklist of parks 
6. You should be able to check off parks and see your `parks visited` increase
7. Narrow the view by state.
8. Click the see more button on the park card to see more information about the park. 


## 🕹️ Deploy Link
https://m4-parks-frontend.vercel.app/

## 📷 Preview of App
![sample video of the project](https://github.com/M4-Park-Checklist/m4-parks-frontend/blob/main/NPS%20gif.gif?raw=true)

## 🍎 Context
This app was the first time we worked with a Backend Team to cultivate a server of our own requests. We had a goal in mind to make a travel journal for anyone to use conviniently and are in the first stage of development. We started to use Axios for our fetches and plan to use Tailwind for styling. As time goes on we will be adding more to this project so that we can publish the app for use by anyone who wants to use it.

## 🧠 Contributors
- Lex - https://www.linkedin.com/in/lex-hastings-88798a1b5/, https://github.com/Jesuitman
- Joey - https://www.linkedin.com/in/joe-stewart-1b1a97114/, https://github.com/JoeyStewart
- Kam - https://www.linkedin.com/in/kameron-kennedy-pe/, https://github.com/kameronk92
- Paul - https://www.linkedin.com/in/paul-bennett-dev, https://github.com/pcbennett108
- Arden - https://www.linkedin.com/in/arden-ranta/, https://github.com/tenthwalker

## 🖇️ Learning Goals
### Backend Integration: 

### Sprint Based development:

### New Team Dyanmics with Backend Team:

### Error Handling: 

### Axios: 

### Unstructured project expectations: 

## 🎆 Wins && 🔥 Challenges
### Wins:
Lex - This is a celebration of everything I have learned so far! I got to work with a backend team and learn more about what it takes to be a full stack dev.

Joey - The project has been going extremely smooth so far. It's very rewarding to see the progress that I have made. We have been able to tackle this project through collaboration and great time management. No issue has been a major headache thus far. Our progress has been so steady that there has been no crunch and we are now able to re-evaluate what we wish to implement either before the deadline or during part two.

### Challenges: 
Lex - Learning new stretch techs is always a challenge, helpfully allieviated by the documentation and easy implmentation. The other main challenge I experienced for the project was adapting my fetch requests to the backend server we had set up. Another challenge was working around the request limit because if we coded irresponsibly, the fetch limit would be quick to eat up.

Joey - Getting the single park view was a bit of a challenge at first. I intended to use another api call to pull a single park with the use of its ID and then display it on the screen. I could find no way to actually pull a single park with this method. I then realized that we already have the entire array already stored in a useState. So I was able to use the park.id that was chosen from a ‘click’ on the park’s card to filter the single park with the same id, and then place that in its own useState so it could be used as a prop in the details component. Saving us from our limited amount of api calls per hour in the process.

## 📝 Observations  
Lex - I got to really learn what backend does and is all about! I really enjoyed the opportunity to work with them in this low stress environment. They taught me a lot too which will be helpful for the future. 

Joey -  It was our first time working with a backend team, we needed to discuss what they’re part of the project actually entails. Getting a better understanding of the BE allowed us to manipulate our presented data so that the FE and the BE could finally connect and work in unison.

## 📊 Future Plans:
- Tailwind implementation for all of our styling
- More information available for the parks
- Sorting options for all the parks
- A "visited parks" page
- Checking a park removes it from your checklist of parks you can see at a glance
- A cover page to welcome the user
- A login for storing information
- A favorited parks page
- Bug Fixes as the need arises

## ✋ User Test Instructions 
1. Refresh the page on load, see the loading screen
2. Click some of the checkboxes on the parks, notice that your `parks visited` number increases
3. Scroll to the bottom of the page and click the right arrows to see more parks
4. Check off some more parks, notice your counter stays consistent
5. Filter your view by state
6. Notice that you have a significantly limited amount of parks now, but far more information available
7. Click a see more button on any of the cards
8. Notice more information is now displayed
9. Click the back browser button
10. View another park
11. Tell me your thoughts?

## 👩‍💻 User Test Results/Observations
- user noticed that the card styling doesnt contain all of the infor, some runs off page *in progress*
- user saw that the activities part of the park detail is currently empty *in progress*
- User wants the ability to right click a park and see a menu of possible actions she can take for the park (could this be done with a hamburger insteado f a right click?)
- user wants to be able to search for parks on checklist view
- user wants the ability to filter parks by activity she wants to do
- user wants to be able to get to the details of a park page by clicking on it somewhere on the checklist view (not being forced to go through state view)
- user wants a wishlist or a planning to visit type of page


# Part 2

## 🖇️ Learning Goals
### Backend Integration: 
Start thinking beyond MVP and consider how to account for performance, feature improvement, and usability. Backup API access in case our primary server takes too long to respond.

### Sprint-based Development:
Use an agile process to turn well-defined requirements into deployed and production ready software in a short time constraint.

### New Team Dynamics with Backend Team:
Gain experience dividing applications into components and domains of responsibilities to facilitate multi-developer teams.

### Error Handling: 
Early and consistent deployment to production, including continuous integration. Direction of users to handle user errors. 

### Tailwind: 
Explore and implement new concepts, patterns, or libraries that have not been explicitly taught while at Turing.

## 🎆 Wins && 🔥 Challenges#
### Wins:
Lex - This is a celebration of everything I have learned so far! I got to work with a backend team and learn more about what it takes to be a full stack dev.

Joey - Getting the sort function to work was a massive win. I wanted it to be dynamic enough so that you could search for any park with any of the filter conditions provided. It turned out to be tougher of a task than I thought but the functionality of it turned out really nice.

Arden - Wins for me would be finding useful libraries and documentation resources for our stretch, having strong collaboration within the frontend group, and integrating Tailwind quickly.

### Challenges: 
Lex - Pivoting from Flutter and Tailwind to just Tailwind was disappointing but a needed step. I also felt greatly challenged by the weather modal because it had different rules than I had used before.

Joey - Having to pivot from Flutter to just Tailwind. We found out that it is possible to use Flutter in conjunction with React, but you have to go through less than professional means to get it working together. We decided to scrap that idea, since it would have needed an entire new app for it to work and with pressing time, we decided all to get up to speed and learn Tailwind and participate it it's implementation.

Arden - Doing research into Flutter that didn't end up getting used, balancing professional development time, and communicating wants and needs to the backend team.

## 📝 Observations  
Lex - Tailwind styling is extremely different compared to regular CSS styling, building rulesets in the XML was something I was not used to. I had to do a lot of learning to get Tailwind working.

Joey -  Flutter looks like an incredible piece of technology that I wish we had the opportunity to use. The rules for Tailwind are a bit harder to make work with our previous css styling. With time, we got better and better, but previously easy tasks became much more tedious. Either way, the results were better and I hope to use it more in the future.

Arden - Tailwind is extremely versatile, refactoring is to be embraced, not feared, and pivoting focus and direction when necessary can be valuable.












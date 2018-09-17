# Developer Comments

I really enjoyed the open ended nature of this technical test. It is nice to have one where you can show your approach to development while building something.

## Initial Thoughts

Reading through the requirements for this task it seemed to me that there is an inherent tension between the request to build "as if you're writing real world production code" and producing a whole app with multiple features in a 2-3 hour time limit.

Attempting both seemed unrealistic (I doubt devs at ClearScore are expected to finish multiple features per hour to a production level!) so I balanced producing some production ready code with a prototype demonstrating all the required features.

## My Approach

The GitHub commit log does a good example of showing my approach to development and my priorities when getting started on a project or feature.

https://github.com/karl/ideas-board/commits/master

My most important priority initially was to get automated build and deployment of the project set up. There isn't much use writing code that can't be deployed to producion :) I used Netlify to handle automated building and deploymwent.

You can view an always up to date production deploy of this code at:

https://ideas-board.netlify.com/

Next I tackled some basic tooling by setting up ESLint and Prettier. While this took 10+ minutes of my limited time, I feel a tight feedback loop during development is very important.

With the basic tooling in place I was able to start development in earnest. I took my usual approach of starting with a quick end to end prototype.

I find this invaluable for rooting out potentially risks in development, and for gaining a holistic understanding of the problem space.

After implementing the spike it became clear that avoiding data loss when reloading the page during development would be a big help in keeping a tight feedback loop. So I implemented very basic loading and saving from local storage.

At this point I was able to switch across to my normal approach to working on a feature. I pulled out chunks of code from my spike and started making it "production" ready by separating it out to modules with clear boundaries and adding tests.

I started with the state logic as that housed the majority of the complexity in the spike, and with my limited time I felt it was more valuable to unit test state related code over components.

By now I had used up almost 2 hours of the 2-3 hour time limit and it was clear that there wouldn't be time to tidy up and write tests for all the spike code as well as complete the required features.

I chose completing the features over writing more tests, but in a real work environment this call would need to be made as a team decision!

I quickly put together the remaining features (max length for descriptions, focusing the title for new ideas, and sorting by title or created date).

With the basic feature set complete I still had a little time remaining so I moved back to making the spike code prodution ready by separating out an Idea component to render individual ideas.

At this point it was late in the evening and I had spent 2.5 hours on the task so I called it quits!

## Next Steps

If I had more time there are some clear next steps I would like to take. Chief among them would be to make more of the spike code "production" ready by separating it out to modules with clear boundaries and adding tests.

The requirement to focus the title for new ideas adds complexity to the React components, so I'd definitely want to add tests for it as well.

Once I have good test coverage and are confident in the code there would be time to polish up the user experience. I'd be interested in trying something like Styled Components for styling (the vanilla CSS I used is OK for a small project but wouldn't scale well).

# Refelctions on the TrailFinders Tech Test

## What was built

First of all, thank you for taking the time to view my solutions to your tech test. The features of this upgraded app are as follows:
<l>

- A priority selector has been added next to the task input box. This can be used or disregarded, depending on whether the user wants to use priority.
  </l>
  <l>
- When a task is added, if a priority has been assigned to that task a colour-coded box will appear to the left of the complete/delete buttons with the text describing the priority of that task. If no priority had been assigned, this box does not appear.
  </l>
  <l>
- Drop down lists to filter by complete/incomplete tasks, as well as filtering by priority, have been added.
  </l>
  <l>
- If the user attempts to add a task without adding a title, or writing anything in the input box, an error message will appear beneath the input box explaining that a title is needed.
  </l>
  <l>
- I've added logic to the API to handle querying from the drop down filter options, but the error messages and status codes for invalid url queries can be seen when attempting to view data with the API directly.
  </l>

## What I'd improve

Given more time, I would like to finalise the sorting features. I would have done this by creating an object to act as a key for priorities, with a scale of 1, 2, and 3 to represent low, medium, and high respectively.</br>

I would also like to improve the styling given more time, so that the app is a more inviting tool. I probably would have made a card component for each task with coloured buttons to represent completed and delete, with icons representing the two actions to remove visual clutter. </br>

Finally, I would implement a multi-view feature, where non-priority tasks can be viewed in one list, and tasks with assigned priority can be viewed in another.

## Interesting & tricky parts

I'm coming to the end of a Northcoders software development bootcamp where I've primarily learned and used JavaScript, so spiking TypeScript was probably the most interesting part. It was great to get hands on experience with a language that I've not used much, and it has helped me see the benefits of using TypeScript over JavaScript.</br>

I knew I wanted to focus on getting the functionality right, in particular the filtering of completed and priority tasks which i was able to fix in the final section when I chose to focus on a filtering UI. </br>

In terms of the back end, I found that adding a priority field and improving validation was something I could have worked on more. Because the priority was already included as an optional field, and I decided that it should be optional if users did not want to add priority, I left it as it was. In terms of the validation, I added an error message that would conditionally render in the front end but did not find a need to include this in the back end when it already existed.

## Closing remarks

Thank you again for reading through my solutions and notes, it was a great experience to apply my problem solving and programming skills. I hope to hear from you soon.

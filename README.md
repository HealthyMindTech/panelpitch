# Panelpit.ch

Get your own hackathon pitch reviewed in minutes by a board of experts!

How it works:
* Upload the pitch 
* Get immediate reviews of the pitch from different experts (providing perspectives from different areas but all important for the success of the pitch)
* Get specific advise for your own pitch and ask for more in-depth analysis with one or more of the experts
* Based on the feedback, you can resubmit your pitch as many times you want, so that you can perfect your pitch before you submit to the competition.

Why:
* Use the collective intelligence of experts to make your pitch perfect
* On-demand expertise, anywhere and at any time

Impact:
* Guidance in perfecting the pitch, giving users the best possible chance of success!

Future work:
* Support for uploading slide decks, audio, and video
* Adding more experts on the advisory board (e.g. Socrates)
* Feature to select a part of the text and ask the expert(s) to reformulate
* Support for generating pitch video based on pitch text (integration with for example Synthesia, Descript, and computing pitch stats such as words to time estimate)
* Integration with hackathon management platforms (e.g. HackJunction)
* Potential to expand use case to beyond hackathons (for example for founders to get their pitch right for investors)

Business model:
* Initial use case in hackathon pitches, then scaling to investor pitches and other usage scenarios
* Subscription based, with a freemium model (free to start with but additional features or use time would require a paid plan)

Technologies used for this project: 
* React, Typescript, AWS, ChatGPT, Midjourney

# Running it

The frontend can easily be started up by just running:

```
$ npm run start
```

The backend can be more tricky, and consists of a sole lambda function in AWS.

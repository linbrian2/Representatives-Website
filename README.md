# House of Representatives
## Overview

A `data.json` file contains all information about the US House of Representatives (with the exception of places like Guam, Puerto Rico, etc.).

You may explore this information through a website generated by handlebars.

## Objectives

This website uses handlebars for templating, as well as HTML and CSS for the baseline. 

## Setup 

Download and install Node.js from: `https://nodejs.org/en/`

Clone this repository and navigate to the directory. As a Windows user, I prefer doing this by opening the command prompt and navigating to the project folder.

From the command prompt install the dependencies:

1. run `npm install`

2. Run `npm install express`. 

3. Run `npm install underscore`.

You are now ready to run the website and explore it!

## Specifications 

### Templating

Templating allows me to create dynamic web pages. I am able to create a skeleton of what the HTML pages should look like, then control the content however I want. Generation is through the templating engine handlebars. The following are the files I have included to help generate webpages along with HTML and basic CSS.

#### `main.handlebars` [5 pts.]

Add a navigation bar to `main.handlebars` so there is one present in all pages rendered.

- This navigation bar has four inline links:

- States: links to `/`
- Democracts: links to `/party/:partyname` for Democrats
- Republicans: links to `/party/:partyname` for Republicans
- Representatives: links to `/rep`

#### `person.handlebars` [8 pts.]

This template is rendered when the `/rep/:repid` endpoint is hit. On this page, the following information is displayed.
- Full name
- State that links to the `/state/:statename` page for that state.
- Birthday
- Description
- The representative's party linking to the `/party/:partyname` endpoint for that party
- A link to the representative's website

#### `representatives.handlebars` [5 pts.]

This template is rendered when either the `/party/:partyname` or `/rep` endpoints are hit. This page displays the following:
- The party that is being displayed
- A list of all the people in that particular group where each name is linked to that representative's `/rep/:repid` page
- Next to each name should also be the state, and this text should link to the relevant `/state/:statename` page

#### `state.handlebars` [4 pts.]

This template is rendered when the `/state/:statename` endpoint is hit. The following is displayed:
- The name of the state
- All of the representatives from that state. The representatives are separated depending on whether they are Democrats or Republicans. If a member of the opposite party does not exist in a state, they and the party text simply will not show up.

#### `allstates.handlebars` [2 pts.]

This template is rendered when the `/` endpoint is hit. This page displays a list of all 50 states, where each name links to the respective `/state/:statename` page.

## Credits

Credit to [this](https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=438) for the `data.json` file. 

### Gitlab Merge Requests Dashboard

#### What is this?
An application for build monitor showing all Merge Requests in your Gitlab Projects.

[![Screenshot](Screenshot.PNG?raw=true)](Screenshot.PNG?raw=true)

#### Setup

Requirements:
* NodeJS
* Gitlab Token

Install dependencies using `npm install`

To run, simply `npm start`.
Open `http://localhost:3000?config=<CONFIG.JSON>&token=<GITLAB_TOKEN>`

#### Adding your config
Follow the file `public/config/sample.json` and create your own config. There are two parts, `rules` and `projects`.

#### Rules

**REFRESH_DURATION_IN_SECONDS** refers to the duration (seconds) where the application will refresh

**MAXIMUM_OPEN_IN_DAYS** refers to the maximum number of days an MR is open. Text will turn red once it is past due

**UPVOTES** refers to number of upvotes. A check will be added once an MR reached a designated number of upvotes

The fourth index refers to the color coding of the Cards. This will add a background color to the Cards; red, orange, and green, and white (reserved for WIP).

**label** refers to the labels added in MR. Exact match, comma delimited

**branch** refers to the source branch in MR. Starts with, comma delimited

**project** refers to the project of MR. Exact match, comma delimited.


#### Projects
**name** Your customizable name for your project.

**namespace** Namespace of the project. https://<gitlab_url>/<namespace>/<project>

**project** Repository itself. https://<gitlab_url>/<namespace>/<project>

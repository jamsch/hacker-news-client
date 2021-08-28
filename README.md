# @jamsch/hacker-news-client

A simple API wrapper for Hacker News with Typescript typings that supports browsers & Node.js.

## Installation

```sh
npm install @jamsch/hacker-news-client
```

## Usage

```javascript
import Client, { Story } from '@jamsch/hacker-news-client';

// Fetch the top 500 story IDs
const topStories = await Client.getTopStories();

// Latest stories, by any type
const newStories = await Client.getNewStories();

// Latest "Ask HN" stories
const askStories = await Client.getAskStories();

// Latest "Show HN" stories
const showStories = await Client.getShowStories();

// Latest "Jobs" stories
const jobStories = await Client.getJobStories();

// Fetch a single story
const story = await Client.getItem(topStories[0]));

// Fetch the user's info
const user = await Client.getUser(story.by);

// Fetch the first 5 stories in parallel. 
// Note: this makes one request per item provided, and the order of the results is not guaranteed.
const topFiveStories = await Client.getItems(topStories.slice(0,5));
```

## Typescript Usage


```ts
import Client, { Story, Ask, Comment, Job, Poll, PollOpt } from '@jamsch/hacker-news-client';

// Fetch an Item
const item = await Client.getItem(1); // "Item" type

console.log(item); // Item (Story | Comment | Ask | Job | Poll | PollOpt)

switch (item.type) {
  case "story": {
    console.log("Ask | Story:", item); // Ask | Story
    if ("text" in item) {
      console.log("Ask:", item); // Ask
    }
    if ("url" in item) {
      console.log("Story:", item); // Story
    }
    break;
  }
  case "comment":
    console.log("Comment:", item); // Comment
    break;
  case "job":
    console.log("Job:", item); // Job
    break;
  case "poll":
    console.log("Poll:", item); // Poll
    break;
  case "pollopt":
    console.log("Polopt", item); // PolOpt
    break;
}

// If you know the item ID belongs to a specific item type:
const storyId = 123;
const storyItem = await Client.getItem<Story>(storyId);
console.log(storyItem); // Story

const storyIds = [1,2,3,4];
const topFiveStories = await Client.getItems<Story>(storyIds);
console.log(topFiveStories); // Story[]
```


## Usage in UMD builds

```html
<script src="{path_to_package}/umd/hacker-news-client.production.min.js"></script>

<script>
  HackerNewsClient.getTopStories().then(topStories => {
    console.log(topStories);
  });
</script>
```
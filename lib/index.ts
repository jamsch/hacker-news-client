import type { Item, User, Updates, Story, Poll, PollOpt, Job, Ask, Comment } from "./typings/types";

export * from "./typings/types";

const get = <T>(uri: string): Promise<T> =>
  fetch("https://hacker-news.firebaseio.com/v0/" + uri).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });

type ItemMap = {
  story: Story;
  comment: Comment;
  poll: Poll;
  pollopt: PollOpt;
  job: Job;
  ask: Ask;
};

const API = {
  is<TType extends keyof ItemMap>(item: Item, type: TType): item is ItemMap[TType] {
    if (type === "ask") {
      return "text" in item;
    }
    return item.type === type;
  },
  /** Fetches up to 500 top and new stories */
  getTopStories(): Promise<number[]> {
    return get("topstories.json");
  },
  getNewStories(): Promise<number[]> {
    return get("newstories.json");
  },
  /** Fetches up to 200 of the latest Ask HN stories */
  getAskStories(): Promise<number[]> {
    return get("askstories.json");
  },
  /** Fetches up to 200 of the latest Show stories */
  getShowStories(): Promise<number[]> {
    return get("showstories.json");
  },
  /** Fetches up to 200 of the latest Job stories */
  getJobStories(): Promise<number[]> {
    return get("jobstories.json");
  },
  /** Fetches a Story, Comment, Ask, Job, Poll, or Polopt item */
  getItem<T = Item>(id: number): Promise<T> {
    return get(`item/${id}.json`);
  },
  /** Fetches a list of items in parallel. NOTE: this makes one request per item provided & the order of the returned stories is not guaranteed. */
  getItems<T = Item>(ids: number[]): Promise<T[]> {
    return Promise.all(ids.map((id) => API.getItem<T>(id)));
  },
  getUser(id: string): Promise<User> {
    return get(`user/${id}.json`);
  },
  /** Fetches the latest Item Id. You can walk backward from here to discover all items. */
  getMaxItemId(): Promise<number> {
    return get("maxitem.json");
  },
  getChangedItemsAndProfiles(): Promise<Updates> {
    return get("updates.json");
  },
};

export default API;

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  /** Unix time in seconds */
  time: number;
  title: string;
  type: "story";
  url: string;
}

export interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  /** Unix time in seconds */
  time: number;
  type: "comment";
}

export interface Ask {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text: string;
  /** Unix time in seconds */
  time: number;
  title: string;
  type: "story";
}

export interface Job {
  by: string;
  id: number;
  score: number;
  text: string;
  time: number;
  title: string;
  type: "job";
  url: string;
}

export interface Poll {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  parts: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: "poll";
}

export interface PollOpt {
  by: string;
  id: number;
  poll: number;
  score: number;
  text: string;
  time: number;
  type: "pollopt";
}

/** Response from the /item/${id}.json endpoint */
export type Item = Story | Comment | Ask | Job | Poll | PollOpt;

export interface User {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}

export interface Updates {
  items: number[];
  profiles: string[];
}

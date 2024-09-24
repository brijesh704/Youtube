import React from "react";

const commentsData = [
  {
    name: "John Doe",
    text: "This is a great video!",
    replies: [
      {
        name: "Jane Smith",
        text: "I agree! Very informative.",
        replies: [
          {
            name: "Chris Adams",
            text: "Thanks for the feedback!",
            replies: [],
          },
        ],
      },
      {
        name: "Sam Wilson",
        text: "Absolutely loved it!",
        replies: [],
      },
    ],
  },
  {
    name: "Michael Green",
    text: "Can you do a follow-up video on this topic?",
    replies: [
      {
        name: "Alex Brown",
        text: "Yeah, a follow-up would be awesome!",
        replies: [],
      },
    ],
  },
  {
    name: "Lisa Ray",
    text: "I learned so much from this!",
    replies: [],
  },
  {
    name: "Emily Clark",
    text: "Can someone explain the last part?",
    replies: [
      {
        name: "Mark White",
        text: "Sure, it's about...",
        replies: [
          {
            name: "Sarah King",
            text: "Great explanation, thanks!",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "George Best",
    text: "This video is too long!",
    replies: [
      {
        name: "Ann Lee",
        text: "I actually enjoyed the length, more details are better.",
        replies: [],
      },
    ],
  },
  {
    name: "David Miller",
    text: "I disagree with your opinion on this topic.",
    replies: [
      {
        name: "Peter Parker",
        text: "Why do you disagree? I found it quite convincing.",
        replies: [],
      },
    ],
  },
  {
    name: "Sophia Green",
    text: "Could you make more videos like this?",
    replies: [
      {
        name: "Isabella Young",
        text: "Yes, more videos on this subject would be great!",
        replies: [],
      },
    ],
  },
  {
    name: "James Allen",
    text: "The audio quality could be better.",
    replies: [
      {
        name: "Maria Harris",
        text: "I didn't notice, I thought it was fine.",
        replies: [],
      },
    ],
  },
  {
    name: "Linda Taylor",
    text: "I liked the visuals you used in the presentation.",
    replies: [],
  },
  {
    name: "Oliver Brown",
    text: "Can you provide sources for the data you mentioned?",
    replies: [
      {
        name: "Henry Evans",
        text: "I'd like to see those sources too.",
        replies: [],
      },
    ],
  },
];
const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
      <img
        className="w-12 h-12"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments: </h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;

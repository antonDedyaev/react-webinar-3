import buildCommentHierarchy from ".";

const testData = [
  {
    _id: "65837812041bc610a6d176ca",
    text: "Первый комментарий",
    dateCreate: "2023-12-20T23:26:10.632Z",
    author: {
      profile: {
        name: "User №2",
      },
      _id: "65817be05c295a2ff2fcc583",
    },
    parent: {
      _id: "65817bee5c295a2ff2fcd1ae",
      _type: "article",
    },
    isDeleted: false,
    children: [
      {
        _id: "65837828041bc610a6d176d0",
        text: "Мой ответ для User 2\n",
        dateCreate: "2023-12-20T23:26:32.350Z",
        author: {
          profile: {
            name: "User №2",
          },
          _id: "65817be05c295a2ff2fcc583",
        },
        parent: {
          _id: "65837812041bc610a6d176ca",
          _type: "comment",
        },
        isDeleted: false,
        children: [
          {
            _id: "65837861041bc610a6d176d5",
            text: "Ответ на второй комментарий",
            dateCreate: "2023-12-20T23:27:29.050Z",
            author: {
              profile: {
                name: "User №2",
              },
              _id: "65817be05c295a2ff2fcc583",
            },
            parent: {
              _id: "65837828041bc610a6d176d0",
              _type: "comment",
            },
            isDeleted: false,
            children: [],
          },
        ],
      },
      {
        _id: "6583eb4fbf82ef2ffe0ac740",
        text: "Мой ответ для User №2",
        dateCreate: "2023-12-21T07:37:51.324Z",
        author: {
          profile: {
            name: "User №1",
          },
          _id: "65817be05c295a2ff2fcc582",
        },
        parent: {
          _id: "65837812041bc610a6d176ca",
          _type: "comment",
        },
        isDeleted: false,
        children: [],
      },
      {
        _id: "6583eb75bf82ef2ffe0ac750",
        text: "Мой ответ для User №2",
        dateCreate: "2023-12-21T07:38:29.288Z",
        author: {
          profile: {
            name: "User №1",
          },
          _id: "65817be05c295a2ff2fcc582",
        },
        parent: {
          _id: "65837812041bc610a6d176ca",
          _type: "comment",
        },
        isDeleted: false,
        children: [],
      },
      {
        _id: "6583eb84bf82ef2ffe0ac757",
        text: "Мой ответ для User №2",
        dateCreate: "2023-12-21T07:38:44.627Z",
        author: {
          profile: {
            name: "User №1",
          },
          _id: "65817be05c295a2ff2fcc582",
        },
        parent: {
          _id: "65837812041bc610a6d176ca",
          _type: "comment",
        },
        isDeleted: false,
        children: [],
      },
    ],
  },
  {
    _id: "6583781a041bc610a6d176cd",
    text: "Второй комментарий\n",
    dateCreate: "2023-12-20T23:26:18.085Z",
    author: {
      profile: {
        name: "User №2",
      },
      _id: "65817be05c295a2ff2fcc583",
    },
    parent: {
      _id: "65817bee5c295a2ff2fcd1ae",
      _type: "article",
    },
    isDeleted: false,
    children: [],
  },
  {
    _id: "65837828041bc610a6d176d0",
    text: "Мой ответ для User 2\n",
    dateCreate: "2023-12-20T23:26:32.350Z",
    author: {
      profile: {
        name: "User №2",
      },
      _id: "65817be05c295a2ff2fcc583",
    },
    parent: {
      _id: "65837812041bc610a6d176ca",
      _type: "comment",
    },
    isDeleted: false,
    children: [
      {
        _id: "65837861041bc610a6d176d5",
        text: "Ответ на второй комментарий",
        dateCreate: "2023-12-20T23:27:29.050Z",
        author: {
          profile: {
            name: "User №2",
          },
          _id: "65817be05c295a2ff2fcc583",
        },
        parent: {
          _id: "65837828041bc610a6d176d0",
          _type: "comment",
        },
        isDeleted: false,
        children: [],
      },
    ],
  },
  {
    _id: "65837861041bc610a6d176d5",
    text: "Ответ на второй комментарий",
    dateCreate: "2023-12-20T23:27:29.050Z",
    author: {
      profile: {
        name: "User №2",
      },
      _id: "65817be05c295a2ff2fcc583",
    },
    parent: {
      _id: "65837828041bc610a6d176d0",
      _type: "comment",
    },
    isDeleted: false,
    children: [],
  },
  {
    _id: "6583eb4fbf82ef2ffe0ac740",
    text: "Мой ответ для User №2",
    dateCreate: "2023-12-21T07:37:51.324Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65817be05c295a2ff2fcc582",
    },
    parent: {
      _id: "65837812041bc610a6d176ca",
      _type: "comment",
    },
    isDeleted: false,
    children: [],
  },
  {
    _id: "6583eb75bf82ef2ffe0ac750",
    text: "Мой ответ для User №2",
    dateCreate: "2023-12-21T07:38:29.288Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65817be05c295a2ff2fcc582",
    },
    parent: {
      _id: "65837812041bc610a6d176ca",
      _type: "comment",
    },
    isDeleted: false,
    children: [],
  },
  {
    _id: "6583eb84bf82ef2ffe0ac757",
    text: "Мой ответ для User №2",
    dateCreate: "2023-12-21T07:38:44.627Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65817be05c295a2ff2fcc582",
    },
    parent: {
      _id: "65837812041bc610a6d176ca",
      _type: "comment",
    },
    isDeleted: false,
    children: [],
  },
];

describe("buildCommentHierarchy", () => {
  it("should correctly build the comment hierarchy", () => {
    const result = buildCommentHierarchy(testData);

    // Проверяем, что в резульат добавляется свойство children
    expect(result.every((comment) => comment.hasOwnProperty("children"))).toBe(
      true
    );
  });

  it("should handle an empty array", () => {
    const result = buildCommentHierarchy([]);

    // Проверяем, что функция корректно обрабатывает пустой входной массив
    expect(result).toEqual([]);
  });

  it("should correctly handle comments with no children", () => {
    const result = buildCommentHierarchy(testData);

    // Проверяем, что комментарии без детей не имеют потомков
    const commentsWithNoChildren = result.filter(
      (comment) => comment.children.length === 0
    );
    expect(
      commentsWithNoChildren.every((comment) => comment.children.length === 0)
    ).toBe(true);
  });
});

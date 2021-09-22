export type PostType = {
    __typename?: "Post" | undefined;
    id: number;
    body: string;
    imgUrl: string;
    creatorId: number;
    eventId: number;
    createdAt: string;
    updatedAt: string;
    creator: {
        __typename: "User";
        id: number;
        username: string;
        bio: string;
        name: string;
        imgUrl: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
    event: {
        __typename?: "Event";
        createdAt: string;
        creatorId: number;
        description: string;
        id: number;
        imgUrl: string;
        name: string;
        tagLine: string;
        updatedAt: string;
    };
};

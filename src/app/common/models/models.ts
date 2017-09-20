export interface BaseEntity {
    Id?: number;
}

export interface Answer extends BaseEntity {
    Text: string;
    IsCorrect?: boolean;
    Card?: Card;
}

export interface Card extends BaseEntity {
    Question: string;
    CardType: CardType;
    Deck: Deck;
    Comments: Comment[];
    Answers: Answer[];
}

export interface CardType extends BaseEntity {
    Name: string;
    Cards: Card[];
}

export interface Category extends BaseEntity {
    Name: string;
    Courses?: Course[];
    Decks?: Deck[];
}

export interface Comment extends BaseEntity {
    Message: string;
    User: User;
    Course?: Course;
    Card?: Card;
}

export interface Course extends BaseEntity {
    Name: string;
    Description: string;
    Price: number;
    Photo?: string;
    Category?: Category;
    Decks?: Deck[];
    Comments?: Comment[];
}

export interface Deck extends BaseEntity {
    Name: string;
    Price: number;
    Rating?: number;
    Photo?: string;
    Category?: Category;
    Cards?: Card[];
}

export interface Report extends BaseEntity {
    Reason?: string;
    Description?: string;
    Date: Date;
    Sender: User;
}

export interface Role extends BaseEntity {
    Name: string;
}

export interface Statistic extends BaseEntity {
    SuccessPercent: number;
    User: User;
    Deck: Deck;
}

export interface User extends BaseEntity {
    Login: string;
    Password?: string;
    Photo?: string;
    Email?: string;
    IsBlocked?: boolean;

    Comments?: Comment[];
    Reports?: Report[];
}

export interface UserCourse extends BaseEntity {
    Rating: number;
    User: User;
    Course: Course;
}

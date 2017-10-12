export interface BaseEntity {
    Id?: number;
}

export interface Answer extends BaseEntity {
    Text: string;
    IsCorrect?: boolean;
    Card?: Card;
    IsChecked?: boolean;
}

export interface Card extends BaseEntity {
    Question: string;
    CardType: CardType;
    Deck: Deck;
    Comments: Comment[];
    Answers: Answer[];
    IsPassed?: boolean;
}

export interface CardType extends BaseEntity {
    Name: string;
    Cards: Card[];
}

export interface Category extends BaseEntity {
    Name: string;
    Linking: string;
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
    Linking: string;
    Description: string;
    Price: number;
    Photo?: string;
    Category?: Category;
    Decks?: Deck[];
    Comments?: Comment[];
    CategoryName?:string;
}

export interface Deck extends BaseEntity {
    Name: string;
    Linking: string;
    Price: number;
    CardsNumber?: number;
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
    grant_type?: string;

    Comments?: Comment[];
    Reports?: Report[];
}

export interface UserCourse extends BaseEntity {
    Rating: number;
    User: User;
    Course: Course;
}

export interface Token extends BaseEntity {
    access_token: string;
    expires_in: User;
    token_type: Course;
}


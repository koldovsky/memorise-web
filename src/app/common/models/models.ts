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
    CardType?: CardType;
    CardTypeName?: string;
    Deck?: Deck;
    DeckName?: string;
    Comments?: Comment[];
    Answers?: Answer[];
    IsPassed?: boolean;
    RightAnswersText?: string;
    CustomerAnswersText?: string;
    IsDisabled?: boolean;
}

export interface CardType extends BaseEntity {
    Name: string;
    Cards?: Card[];
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
    CategoryName?: string;
    Decks?: Deck[];
    DeckNames?: string[];
    Comments?: Comment[];
    IsSubscribed?: boolean;
}

export interface Deck extends BaseEntity {
    Name: string;
    Linking: string;
    Price: number;
    Description?: string;
    CardsNumber?: number;
    Rating?: number;
    Photo?: string;
    Category?: Category;
    CategoryName?: string;
    Cards?: Card[];
    Courses?: Course[];
    CardIds?: string[];
    CourseNames?: string[];
    IsSubscribed?: boolean;
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

export interface Statistics extends BaseEntity {
    CardStatus?: number;
    UserLogin: string;
    CardId: number;
}

export interface SubscriptionStatistics {
    UserLogin: string;
    ItemId: number;
}

export interface IdentityUpdate {
    ExistingLogin: string;
    NewUserData: User;
}

export interface User {
    Id?: string;
    Login: string;
    FirstName?: string;
    LastName?: string;
    Gender?: string;
    Country?: string;
    City?: string;
    Password?: string;
    Photo?: string;
    Email?: string;
    IsBlocked?: boolean;
    grant_type?: string;

    Comments?: Comment[];
    Reports?: Report[];
}

export interface RegisterExternalBindingModel {
    UserName: string;
    Email?: string;
    Provider: string;
    ExternalAccessToken: string;
}

export interface CourseSubscription extends BaseEntity {
    Rating?: number;
    UserLogin: string;
    CourseId: number;
}

export interface DeckSubscription extends BaseEntity {
    Rating?: number;
    UserLogin: string;
    DeckId: number;
}

export interface Token extends BaseEntity {
    userName: string;
    access_token: string;
    expires_in: number;
    token_type: string;
}

export class PageResponse<T> {
    items: T[];
    totalCount: number;
}

export class SearchDataModel {
    page: number;
    pageSize: number;
    sort: boolean;
    searchString: string;

    deckLinking?: string;
}

export interface WordInput extends BaseEntity {
    CardId: number;
    CustomerAnswerText: string;
    RightAnswersText: string[];
    IsRight: boolean;
}

export interface CodeAnswer extends BaseEntity {
    CardId: number;
    CodeAnswerText: string;
    IsRight: boolean;
}

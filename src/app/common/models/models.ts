export interface BaseEntity {
    id?: number;
}

export interface Answer extends BaseEntity {
    text?: string;
    isCorrect?: boolean;
    card?: Card;
}

export interface Card extends BaseEntity {
    cardType: CardType;
    deck: Deck;
    comments?: Comment[];
    answers: Answer[];
}

export interface CardType extends BaseEntity {
    name: string;
    cards: Card[];
}

export interface Category extends BaseEntity {
    name: string;
    courses?: Course[];
    decks?: Deck[];
}

export interface Comment extends BaseEntity {
    message: string;
    user: User;
    course?: Course;
    card?: Card;
}

export interface Course extends BaseEntity {
    name: string;
    description: string;
    price: number;
    photo?: string;
    category?: Category;
    decks?: Deck[];
    comments?: Comment[];
}

export interface Deck extends BaseEntity {
    name: string;
    price: number;
    rating?: number;
    photo?: string;
    category?: Category;
    cards?: Card[];
}

export interface Report extends BaseEntity {
    reason?: string;
    description?: string;
    date: Date;
    sender: User;
}

export interface Role extends BaseEntity {
    name: string;
}

export interface Statistic extends BaseEntity {
    successPercent: number;
    user: User;
    deck: Deck;
}

export interface User extends BaseEntity {
    login: string;
    password?: string;
    photo?: string;
    email?: string;
    isBlocked?: boolean;

    comments?: Comment[];
    reports?: Report[];
}

export interface UserCourse extends BaseEntity {
    rating: number;
    user: User;
    course: Course;
}
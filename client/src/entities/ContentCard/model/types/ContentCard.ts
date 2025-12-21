export enum ContentCardPages {
    ABOUT_INSTITUTE = 'ABOUT_INSTITUTE',
}

export enum ContentCardFirstElement {
    TEXT = 'text',
    MEDIA = 'media',
}

export enum ContentCardAlignText {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
    JUSTIFY = 'justify',
}

export interface ContentCard {
    id: number;
    text?: string;
    img?: string | null;
    video?: string | null;
    videoPoster?: string | null;
    position: number;
    firstElement: ContentCardFirstElement;
    page: string;
    alignText: ContentCardAlignText;
}

export enum ParagraphFirstElement {
    TEXT = 'text',
    MEDIA = 'media',
}

export enum ParagraphAlignText {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
    JUSTIFY = 'justify',
}

export interface Paragraph {
    id: number;
    text?: string;
    img?: string | null;
    video?: string | null;
    videoPoster?: string | null;
    position: number;
    firstElement: ParagraphFirstElement;
    newsId: number;
    alignText: ParagraphAlignText;
}

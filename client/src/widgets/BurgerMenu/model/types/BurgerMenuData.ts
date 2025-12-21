export interface BurgerMenuDataSubSection {
    text: string;
    path: string;
}

export interface BurgerMenuDataSection extends BurgerMenuDataSubSection {
    subSections: BurgerMenuDataSubSection[]
}

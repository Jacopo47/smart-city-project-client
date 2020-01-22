export interface Fact {
    zone: string,
    period: string,
    value: number
}

export interface Facts {
    fact: Fact[]
}
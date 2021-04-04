export class Quiz {
    readonly question: string
    readonly options: Array<string>
    readonly answer: number

    constructor(question: string, options: Array<string>, answer: number) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    equals(obj: Quiz): boolean {
        return this.question === obj.question;
    }
}
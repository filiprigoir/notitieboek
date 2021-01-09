export class Paginator {
    totaleLengte: number;
    pointer: number
    pageSize: number;  
    defaultLengte: number;

    constructor(pageIndex: number, pagesize: number) {
        this.pointer = pageIndex * pagesize;
        this.pageSize = pagesize;
        this.defaultLengte = 0;
        this.totaleLengte = 0;
    }
}

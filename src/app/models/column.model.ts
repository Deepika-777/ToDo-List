export class Column {
    public name: string = '';
    public effort_sum: number = 1; 
    public id: number = 0;
    public tasks: Row[] = [];
  
    constructor( name: string,  effort_sum:number,  tasks: Row[], id: number) {
        this.name = name;
        this.effort_sum = effort_sum ;
        this.tasks = tasks;
        this.id = id + 1;
    }

    effortSum(){
        this.effort_sum = 0
        this.tasks.forEach(element => {
            console.log('inner',element);
            this.effort_sum = this.effort_sum+element['effort']  
        }); 
        console.log('sum',this.effort_sum)
    }   
}

export class Row {
    public titlelimit = 20;
    public title: string = '';
    public effort: number = 0; 
    public due_date: string = '';
    public status: boolean = false;
    public start_date: string = '';
    public end_date: string = '';

    constructor(title: string,effort: number,due_date: string,status: boolean,start_date: string,
        end_date: string){
    this.title = title;
    this.effort = effort;
    this.due_date = due_date;
    this.status = status
    this.start_date =  start_date
    this.end_date = end_date
    }     
}
import * as math from "mathjs";
import { Constants } from '../utils/constants';
import { _ } from 'underscore';

class AppTools {

  public static parseTask(id: number, task: string): RTTask {
    let parsedTask: string[] = /\((\d+),(\d+),(\d+)\)/.exec(task);
    if (parsedTask.length != 4) throw "Invalid system, can't parse";
    return new RTTask(id, parsedTask[1], parsedTask[2], parsedTask[3]);
  }

  public static parseSystemTasks(system: string): RTTask[] {
    let charStack: string[] = [];
    let currentTask: string = "";
    let tasks = [];
    let taskId = 1;
    for (var i = 0; i < system.length; i++) {
      let currentChar: string = system[i];
      switch (currentChar) {
        case ' ':
          break;
        case '(':
          charStack.push(currentChar);
          currentTask += currentChar;
          break;
        case ')':
          charStack.pop();
          currentTask += currentChar;
          break;
        case ',':
          if (charStack.length > 0) {
            currentTask += currentChar;
          }
          else {
            tasks.push(AppTools.parseTask(taskId++, currentTask));
            currentTask = "";
          }
          break;
        default:
          currentTask += currentChar;
      }
    }

    if (charStack.length > 0) throw "Parsing failed";

    if (currentTask.length > 0) {
      tasks.push(AppTools.parseTask(taskId++, currentTask));
    }

    return tasks;
  }
}


/* Global classes */
class RTSchedulingResult {

  private _isScheludable:boolean;
  private _mapping:any;
  private _order:any;

  constructor(_isScheludable:boolean = false, mapping:any = null, order:any = null) {
    this._isScheludable = _isScheludable;
    this._mapping = mapping;
    this._order = order;
  }

  public isScheludable() { return this._isScheludable; }

  public getMapping() { return this._mapping; }

  public getOrder() { return this._order; }
}

export class RTTask {
  private executionTime: number;
  private period: number;
  private expire: number;
  private fu: number;
  private id: number;

  constructor(id: number, c: string, t: string, d: string) {
    /*
    C	Tiempo ejecucion
    T	Periodo
    D	Vencimiento
    */
    this.id = id;
    this.executionTime = math.round(parseFloat(c), Constants.defaultDecimals) as number;
    this.period = math.round(parseFloat(t), Constants.defaultDecimals) as number;
    this.expire = math.round(parseFloat(d), Constants.defaultDecimals) as number;
    this.fu = math.round(this.period > 0 ? this.executionTime / this.period : 0, Constants.defaultDecimals) as number;
  }

  public getId(): number {
    // console.log('RTTask.getId');
    return this.id;
  }

  public getExecutionTime(): number {
    // console.log('RTTask.getExecutionTime');
    return this.executionTime;
  }
  public getPeriod(): number {
    // console.log('RTTask.getPeriod');
    return this.period;
  }
  public getExpire(): number {
    // console.log('RTTask.getExpire');
    return this.expire;
  }

  public getFU(): number {
    // console.log('RTTask.getFU');
    return this.fu;
  }

}

export class RTSystem {
  private hyperperiod: number = null;
  private tasks: RTTask[];
  private responseTimes: number[];
  private fu: number = null;
  private n: number = null;
  private liu: number = null;
  private bini: number = null;
  private _firstFreeSlot: number;
  private _rmScheduling: any;

  constructor(systemText: string) {
    this.tasks = AppTools.parseSystemTasks(systemText)
    this.hyperperiod = null;
    this.responseTimes = [];
    this.fu = null;
    this.n = null;
    this.liu = null;
    this.bini = null;
    this._firstFreeSlot = null;
  }

  public getTasks() {
    return this.tasks;
  }

  public getHyperperiod(): number {
    // console.log('RTSystem.getHyperperiod');
    if (!this.hyperperiod) {
      let periods = _.map(this.tasks, function (o) { return o.period; });
      this.hyperperiod = math.lcm.apply(null, periods);
    }
    return this.hyperperiod;
  }

  public getFU(): number {
    // console.log('RTSystem.getFU');
    if (!this.fu) {
      this.fu = math.round(
        math.sum(
          _.map(this.tasks, function (o) { return o.fu; })
        )
        , Constants.defaultDecimals) as number;
    }

    return this.fu;
  };

  public getN(): number {
    // console.log('RTSystem.getN');
    if (!this.n) {
      this.n = !!this.tasks ? this.tasks.length : 0;
    }
    return this.n;
  };

  public getLiu(): number {
    // console.log('RTSystem.getLiu');
    if (!this.liu) {
      let n = this.getN();
      this.liu = math.round(n * (math.pow(2, 1 / n) as number - 1), 2) as number;
    }
    return this.liu;
  };

  public isValidForLiu(): boolean {
    // console.log('RTSystem.isValidForLiu');
    return this.getFU() <= this.getLiu();
  }

  public getBini(): number {
    // console.log('RTSystem.getBini');
    if (!this.bini) {
      this.bini = math.round(math.prod(_.map(this.tasks, function (o) { return o.fu + 1; })) as number, 2) as number;
      return this.bini;
    }
    return this.bini;
  };

  public isValidForBini(): boolean {
    // console.log('RTSystem.isValidForBini');
    return this.getBini() <= 2;
  }

  public getTaskTiming(): number[] {
    // console.log('RTSystem.getTaskTiming');
    if (this.responseTimes.length > 0)
      return this.responseTimes;

    /* When there are no other tasks, reponse time = execution time */
    this.responseTimes.push(this.tasks[0].getExecutionTime());

    if (this.tasks.length == 1) return this.responseTimes;

    /* For the others calculate */
    /*
    t^(q+1) = Ci + SUM (j=1 -> i-1) Ceil(t^q / Tj).Cj
    */
    // console.log("getTaskTiming, tareas restantes: ", this.tasks.length - 1);
    let iterationCount = 0;
    for (var i = 1; i < this.tasks.length; i++) {
      iterationCount += 1;
      // console.log("TAREA ACTUAL: ", i);
      let currentTask = this.tasks[i];

      let latestCalculatedTime = this.responseTimes[i - 1]

      /* Add seed (Previous response time) to partial result */
      let partialResults = [];
      partialResults.push(latestCalculatedTime);
      // console.log("Partial results", partialResults);

      /* There is no previous result yet */
      let previousResult = null;

      /* Current result is initialized with the latest */
      let currentResult = latestCalculatedTime;

      /* If both values are different continue 
       * else a fixed point has been found and the process has to stop  
       */
      while (currentResult != previousResult) {
        // console.log("current result", currentResult, "previous result", previousResult);
        iterationCount += 1;
        /* Previous result is updated with the latest calculated up to this point */
        previousResult = currentResult;
        /* Current result initialized with the execution time of the current task  */
        currentResult = currentTask.getExecutionTime();

        /* Iterate over all previous tasks -> SUM (from j=1 to i-1) Ceil(t^q / Tj).Cj */
        // console.log("iterating over previous tasks");
        for (let x = 0; x < i; x++) {
          // // console.log("tarea previa actual: ", x);
          let loopTask = this.tasks[x];
          currentResult += math.ceil(previousResult / loopTask.getPeriod()) *
            loopTask.getExecutionTime()
        }

        partialResults.push(currentResult);

        // console.log("iterating over previous tasks ended");
      }

      this.responseTimes.push(currentResult);
    }

    // console.log("iterationCount", iterationCount);

    return this.responseTimes;
  }

  public getFirstFreeSlot(): number {
    // console.log('RTSystem.getFirstFreeSlot');
    if (this._firstFreeSlot === null) return this._firstFreeSlot;

    /* M >= menor t | t = 1 + j=1 SUM n (techo(t / Tj) * Cj) */

    let latestResponseTime = _.last(this.getTaskTiming());

    let seed = 1 + latestResponseTime;

    let partialResults = [seed];
    /* There is no previous result yet */
    let previousResult = null;
    /* Current result is the seed */
    let currentResult = partialResults[0];

    do {
      previousResult = currentResult;
      /* Current result initialized with 1 */
      currentResult = 1;

      /* Iterate over all previous tasks -> SUM (from j=1 to i-1) Ceil(t^q / Tj).Cj */
      for (let x = 0; x < this.tasks.length; x++) {
        let loopTask = this.tasks[x];
        currentResult += math.ceil(previousResult / loopTask.getPeriod()) * loopTask.getExecutionTime();
      }
      /* If both values are different continue else a fixed point has been found */
    }
    while (previousResult != currentResult);

    return previousResult;
  }

  public getRMScheduling() {
    if (this._rmScheduling != null) {
      return this._rmScheduling;
    }

    if (this.getFU() > this.getLiu()) return new RTSchedulingResult();

    let unattendendTasks: number[] = _.map(this.tasks, o => o.getId());
    let executionCount: any = {}, nextStart: any = {}, scheduling: any = {};

    /* Initiate counters */
    _.each(this.tasks, function (item) {
      executionCount[item.getId()] = 0;
      nextStart[item.getId()] = item.getPeriod();
      scheduling[item.getId()] = [];
    });

    /* Loop variable declarations */
    let i: number, taskId: number, currentCell: number = 0;
    let currentTask: RTTask, selectedTask: RTTask;
    let executionOrder: number[] = [];

    while (unattendendTasks.length > 0) {
      /* Reset selected task in each cell iteration */
      selectedTask = null;
      for (i = 0; i < this.tasks.length; i++) {
        currentTask = this.tasks[i];
        taskId = currentTask.getId();

        /* Check if it is time to reset execution count */
        if (currentCell == nextStart[taskId]) {
          nextStart[taskId] += currentTask.getPeriod();
          executionCount[taskId] = 0;
          unattendendTasks.push(taskId);
        }

        /* If there is no selected task and current task has not been attended */
        if (selectedTask == null &&
          // executionCount[taskId] < currentTask.getExecutionTime() &&
          _.contains(unattendendTasks, taskId)) {
          /* Current task will be executed, cell will be assigned to it, 
           * execution count will be incremented
           */
          selectedTask = currentTask;
          scheduling[taskId].push(true);
          executionCount[taskId] += 1;
          executionOrder.push(taskId);
          /* If the required execution units are completed 
           * remove task from unattended tasks 
           */
          if (executionCount[taskId] >= currentTask.getExecutionTime()) {
            unattendendTasks = _.difference(unattendendTasks, [taskId])
          }
        }
        else {
          /* If there is a selected task or current task has been attended,
           * this task won't be executed in this cell
           */
          scheduling[taskId].push(false);
        }
      }

      currentCell += 1;
    }

    this._rmScheduling = new RTSchedulingResult(true, scheduling, executionOrder);

    return this._rmScheduling;
  }
}
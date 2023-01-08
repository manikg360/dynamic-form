import { EventEmitter, Injectable, Output } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public questions:any = [];
  public questionUpdateEvent = new EventEmitter();

  constructor() { }

  getQuestions() {
    var questionJson =  localStorage["dynamicQuestions"];
    return JSON.parse(questionJson  || '[]');
  }

  saveQuestions(newQuestion: any) {
    newQuestion.id = uuid.v4();
    newQuestion.answer = '';
    //Get previous data
    var questionData = this.getQuestions();
    questionData.push(newQuestion);
    localStorage.setItem('dynamicQuestions', JSON.stringify(questionData));
    var updatedQuestions = this.getQuestions();
    this.questionUpdateEvent.emit(updatedQuestions);
  }

  updateQuestions(questions: any[]) {
    localStorage.setItem('dynamicQuestions', JSON.stringify(questions));
    this.questionUpdateEvent.emit(questions);
  }
}

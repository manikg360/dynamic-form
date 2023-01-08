import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from 'app/service/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit, OnDestroy {

  @ViewChild('addQuestionModal', {static: false}) addQuestionModal: TemplateRef<any>;
  public newQuestion: {
    prompt: string,
    type: string,
    options: any[],
    hasOtherOption: boolean,
    label:string,
  } = {
    prompt: '',
    type: 'paragraph',
    options: [],
    hasOtherOption: false,
    label:''
  };
  public questionAnswer : any[];
  public questions: [
    {
      prompt: string,
      type: string,
      options: any[],
      hasOtherOption: boolean,
      label:string,
      answer: string,
      otherAnswer: boolean
    } 
  ];
  private questionModal: NgbModalRef;
  public optionValidation = false;
  constructor(private modalService: NgbModal, public questionService : QuestionService, private _router: Router) { }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
    this.resetAnswers();
    this.questionService.questionUpdateEvent.subscribe((data) => {
      this.questions = data;
    });
  }

  ngOnDestroy() {
    this.questionService.questionUpdateEvent.unsubscribe();
  }

  addQuestion() {
    this.questionModal = this.modalService.open(this.addQuestionModal, {backdrop:'static'});
  }

  addOption() {
    this.optionValidation = false;
    this.newQuestion.options.push({ label: '' });
  }

  removeOption(option: any) {
    this.newQuestion.options = this.newQuestion.options.filter(o => o !== option);
  }

  async saveQuestionData(form: NgForm) {
    if(this.newQuestion.type === 'checkbox' && this.newQuestion.options.length <= 0) {
      this.optionValidation = true;
      return;
    }  else {
      this.optionValidation = false;
    }
    if(!form.valid) return;
    await this.questionService.saveQuestions(this.newQuestion);
    this.newQuestion = {
      prompt: '',
      type: 'paragraph',
      options: [],
      hasOtherOption: false,
      label: ''
    };
    this.questionModal.close();
  }

  async updateQuestions() {
    await this.questionService.updateQuestions(this.questions);
    this._router.navigate(['form/answers'])
  }

  async resetAnswers() {
    var data = this.questionService.getQuestions();
    data.forEach((question: {
      prompt: string,
      type: string,
      options: any[],
      hasOtherOption: boolean,
      label:string,
      answer: string,
      otherAnswer: boolean
    } ) => {
      question.answer = '';
      question.otherAnswer = false;
      question?.options.forEach((option: { selected: boolean; }) => {
        option.selected = false
      })
    });
    await this.questionService.updateQuestions(data);
  }

}

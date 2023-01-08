import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'app/service/question.service';

@Component({
  selector: 'app-review-answers',
  templateUrl: './review-answers.component.html',
  styleUrls: ['./review-answers.component.css']
})
export class ReviewAnswersComponent implements OnInit {
  public questions: any[];

  constructor(public questionService : QuestionService) { 
  }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
  }

}

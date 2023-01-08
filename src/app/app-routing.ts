import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ReviewAnswersComponent } from './review-answers/review-answers.component';


export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'form/builder', 
    pathMatch: 'full' 
  },
  { 
    path: 'form/builder', 
    component: QuestionFormComponent,
    pathMatch: 'full' 
  },
  { 
    path: 'form/answers', 
    component: ReviewAnswersComponent,
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

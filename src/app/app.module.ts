import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewAnswersComponent } from './review-answers/review-answers.component';
import { AppRoutingModule } from './app-routing';


@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent,
    ReviewAnswersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

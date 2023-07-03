import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstSubsribtion: Subscription;
  constructor() {}

  ngOnInit() {
    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        // emitting new data using observer
        observer.next(count);
        // implementing complete
        if (count === 5) {
          observer.complete();
        }
        // fake error just for educational purposes
        if (count > 3) {
          observer.error(new Error('Count greater tha 3!'));
        }
        count++;
      }, 1000);
    });

    // Implementing Operators

    this.firstSubsribtion = customObservable
      .pipe(
        filter((data: number) => data > 2),
        map((data: number) => 'Round: ' + data)
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        // handling an error
        (error) => {
          alert(error.message + 'Unsubscribed of this observable! ');
        },
        () => {
          console.log('Completed!');
        }
      );
  }

  ngOnDestroy(): void {
    // it will be unsubscribed once observer throw an error without below line of code but it won't affect on the behavior of my observable
    this.firstSubsribtion.unsubscribe();
  }
}

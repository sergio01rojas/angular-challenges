import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-subscription',
  imports: [AsyncPipe],
  template: `
    These are from ActivatedRoute snapshot
    <div>TestId: {{ testIdSnapshot }}</div>
    <div>Permission: {{ permissionSnapshot }}</div>
    <div>User: {{ userSnapshot }}</div>

    <hr />

    These are from ActivatedRoute
    <div>TestId: {{ testId$ | async }}</div>
    <div>Permission: {{ permission$ | async }}</div>
    <div>User: {{ user$ | async }}</div>

    <hr />

    These are from Component Input Binding
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  private activatedRoute = inject(ActivatedRoute);

  testIdSnapshot = this.activatedRoute.snapshot.params['testId']
  permissionSnapshot = this.activatedRoute.snapshot.data['permission'];
  userSnapshot = this.activatedRoute.snapshot.queryParams['user'];

  testId$ = this.activatedRoute.params.pipe(map((p: Params) => p['testId']));
  permission$ = this.activatedRoute.data.pipe(map((d: Data) => d['permission']));
  user$ = this.activatedRoute.queryParams.pipe(map((q: Params) => q['user']));

  testId = input<string>('');
  permission = input<string>('');
  user = input<string>('');

}

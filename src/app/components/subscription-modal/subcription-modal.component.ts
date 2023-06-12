import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventSubscription } from 'src/app/models/event-subscription';
import { ShitEvent } from 'src/app/models/shit-event';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-subcription-modal',
  templateUrl: './subcription-modal.component.html',
  styleUrls: ['./subcription-modal.component.scss']
})
export class SubcriptionModalComponent implements OnChanges, OnInit {
  changeReminderAmount($event: Event, arg1: number) {
    const target = $event.target as HTMLInputElement;
    const value = target.value

    this.newSubscriptions.filter(sub => sub.id === arg1)[0].reminderAmount = parseInt(value);

  }
  changeReminderUnit($event: Event, arg1: number) {
    const target = $event.target as HTMLSelectElement;
    const value = target.value;

    this.newSubscriptions.filter(sub => sub.id === arg1)[0].reminderUnit = (value as "WEEK" | "HOUR" | "DAY");

  }
  private static internalNewSubscriptionId = -2;

  @Input() public event: ShitEvent | null = null;
  @Input() public subscriptions: EventSubscription[] = [];
  @Input() public onSaveCallback: (newSubs: EventSubscription[], oldSubs: EventSubscription[], updatedSubs: EventSubscription[]) => void = () => { };
  public renderedSubsciptions: EventSubscription[] = []
  private newSubscriptions: EventSubscription[] = [];
  private deletedSubscriptions: EventSubscription[] = [];
  // TODO: add updatedSubscriptions
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.updateRenderedSubscrptions()
  }

  isNew(sub: EventSubscription): boolean {
    return !this.newSubscriptions.includes(sub);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes["event"]?.isFirstChange()) {
      return;
    }

    this.newSubscriptions = [];

    this.addDefaultSubscription();

    this.updateRenderedSubscrptions()


  }

  updateRenderedSubscrptions(): void {

    const subscriptions: EventSubscription[] = []

    subscriptions.push(...this.subscriptions)
    subscriptions.push(...this.newSubscriptions);

    this.renderedSubsciptions = subscriptions.filter(sub => this.deletedSubscriptions.indexOf(sub) === -1);
  }

  createNewSubscription() {

    this.newSubscriptions.push({
      eventId: this.event?.id ?? -1,
      id: SubcriptionModalComponent.internalNewSubscriptionId--,
      reminderAmount: 0,
      reminderUnit: "DAY",
      userId: this.accountService.getUser()?.id ?? -1
    })

    this.updateRenderedSubscrptions();

  }

  deleteSubscription(subscription: EventSubscription) {

    if (this.newSubscriptions.indexOf(subscription) !== -1) {
      this.newSubscriptions = this.newSubscriptions.filter(sub => sub !== subscription)
    }

    if (this.subscriptions.indexOf(subscription) !== -1) {
      this.deletedSubscriptions.push(subscription)
    }

    this.updateRenderedSubscrptions()

  }

  save() {

    this.onSaveCallback(this.newSubscriptions, this.deletedSubscriptions, []);
    this.newSubscriptions = [];
    this.deletedSubscriptions = [];
    this.addDefaultSubscription();

    this.updateRenderedSubscrptions()

  }
  cancle() {
    this.newSubscriptions = [];
    this.deletedSubscriptions = [];
    this.addDefaultSubscription();

    this.updateRenderedSubscrptions()
  }


  addDefaultSubscription() {

    // disabled until bug fixed
    return;
    if (this.subscriptions.length === 0) {
      this.newSubscriptions.push({
        eventId: this.event?.id ?? -1,
        id: -1,
        reminderAmount: 0,
        reminderUnit: "DAY",
        userId: this.accountService.getUser()?.id ?? -1
      })
    }
  }


}


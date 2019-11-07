import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  ErrorStateMatcher
} from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from "./shared/format-datepicker";
import { Poll } from "src/app/models/poll";
import { PollService } from "src/app/services/poll.service";

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: "app-filter-dates-and-another",
  templateUrl: "./filter-dates-and-another.component.html",
  styleUrls: ["./filter-dates-and-another.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterDatesAndAnotherComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FilterDatesAndAnotherComponent),
      multi: true
    }
  ]
})
export class FilterDatesAndAnotherComponent implements OnInit {
  panelOpenState = false;

  @Input() limitMaxStartDate: any;
  @Input() limitMaxEndDate: any;
  @Output() startDate = new EventEmitter();
  @Output() endDate = new EventEmitter();

  @Input() noShow: [];

  startDateLocal: any;
  endDateLocal: any;

  @Output() startHour = new EventEmitter();
  @Output() endHour = new EventEmitter();
  @Output() startMinutes = new EventEmitter();
  @Output() endMinutes = new EventEmitter();

  startHourLocal: any;
  endHourLocal: any;
  startMinutesLocal: any;
  endMinutesLocal: any;

  @Output() daysOfWeek = new EventEmitter();

  selectByWeekDaysLocal: any;

  daysOfWeekArray: Array<String> = [
    "Domingo",
    "Segunda",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexa-Feira",
    "Sábado"
  ];

  timesArray: Array<Number> = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23
  ];

  minutesArray: Array<Number> = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59
  ];
  @Input() branch: string;
  @Input() polls: Array<any>;
  @Output() poll = new EventEmitter();
  pollLocal: any;
  noShowLocal: any;

  filterForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private fb: FormBuilder, private pollService: PollService) {
    this.initForm();
  }

  ngOnInit() {
    this.limitMaxStartDate =
      this.limitMaxStartDate || this.filterForm.get("endDateControl").value;
    this.limitMaxEndDate = this.limitMaxStartDate || new Date(new Date());
    this.initForm();
    this.poll.emit(this.polls[0].id);
  }

  initForm() {
    this.pollLocal = this.polls !== undefined ? this.polls[0].id : null;
    this.filterForm = this.fb.group(
      {
        startDateControl: new FormControl({
          value: new Date(
            new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000
          ),
          disabled: true
        }),
        endDateControl: new FormControl({ value: new Date(), disabled: true }),
        startTimeControl: new FormControl(0),
        endTimeControl: new FormControl(23),
        selectByWeekDaysControl: new FormControl(),
        startMinutesControl: new FormControl(0),
        endMinutesControl: new FormControl(59),
        pollControl: new FormControl(this.pollLocal)
      },
      {
        validator: this.validHourStart
      }
    );
    this.startHourLocal = this.filterForm.get("startTimeControl").value;
    this.endHourLocal = this.filterForm.get("endTimeControl").value;
    this.startMinutesLocal = this.filterForm.get("startMinutesControl").value;
    this.endMinutesLocal = this.filterForm.get("endMinutesControl").value;
  }

  datePickerStartOnChange(startDateParam: any) {
    this.limitMaxStartDate = this.filterForm.get("endDateControl").value;
    this.startDateLocal = startDateParam.value;
    this.startDate.emit(this.startDateLocal);
  }

  datePickerEndOnChange(endDateParam: any) {
    this.limitMaxStartDate = this.filterForm.get("endDateControl").value;
    this.endDateLocal = endDateParam.value;
    this.endDate.emit(this.endDateLocal);
  }

  hourPickerStartOnChange(startHourParam: any) {
    console.log("startHourParam.value fora", startHourParam.value);
    if (parseInt(this.endHourLocal) >= parseInt(startHourParam.value)) {
      this.startHourLocal = startHourParam.value;
      this.startHour.emit(this.startHourLocal);
      console.log("startHourParam.value dentro", startHourParam.value);
    }
  }

  minutesPickerStartOnChange(startMinutesParam: any) {
    this.startMinutesLocal = startMinutesParam.value;
    this.startMinutes.emit(this.startMinutesLocal);
  }
  minutesPickerEndOnChange(endMinutesParam: any) {
    this.endMinutesLocal = endMinutesParam.value;
    this.endMinutes.emit(this.endMinutesLocal);
  }

  hourPickerEndOnChange(endHourParam: any) {
    this.endHourLocal = endHourParam.value;
    this.endHour.emit(this.endHourLocal);
  }

  weekDaysPickerOnChange(selectByWeekDays: any) {
    this.selectByWeekDaysLocal = selectByWeekDays.value;
    this.daysOfWeek.emit(this.selectByWeekDaysLocal);
  }

  pollPickerOnChange(pollSelected: any) {
    this.pollLocal = pollSelected.value;
    this.poll.emit(this.pollLocal);
  }

  validHourStart(form: FormGroup) {
    const condition =
      parseInt(form.get("startTimeControl").value) >=
      parseInt(form.get("endTimeControl").value);
    return condition ? { hourStartValidate: true } : null;
  }
}

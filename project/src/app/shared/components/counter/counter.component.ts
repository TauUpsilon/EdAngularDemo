import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

interface SecondToTime {
  currentDays: string;
  currentHours: string;
  currentMinutes: string;
  currentSeconds: string;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnChanges {

  // 宣告倒數總時間
  @Input() timeLimit: number;
  // 宣告是否開始計時
  @Input() isStartToCount: boolean;
  // 宣告計時器尺寸
  @Input() timerSize: number;
  // 宣告計時器旁邊文字
  @Input() sideNote: string;
  // 宣告計時器顏色
  @Input() color: string;

  // 宣告時間輸出者
  @Output() readonly timeEmitter: EventEmitter<number> = new EventEmitter();
  // 宣告重置時間輸出者
  @Output() readonly resetTimeEmitter: EventEmitter<boolean> = new EventEmitter();

  // 宣告計時器外圈 ViewChild
  @ViewChild('baseTimerPathRemaining', { static: false }) baseTimerPathRemaining: ElementRef;
  // 宣告計時器 ViewChild
  @ViewChild('circleTimer', { static: true }) circleTimer: ElementRef;

  // 宣告計時器外圈總長
  private readonly FULL_DASH_ARRAY = 283;

  // 宣告計時器尖閣時間
  private readonly TICK = 1000;

  // 宣告計時器剩餘時間
  private timeLeft: number;

  // 宣告計時器
  timer$: Observable<{ currentTime: number }>;

  // 宣告計時器剩餘時間數字大小
  fontSize: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isStartToCount.currentValue) {
      this.startTick();
    }
  }

  /**
   * 開始倒數計時功能
   * @returns void
   */
  private startTick(): void {
    this.timer$ = timer(0, this.TICK)
      .pipe(
        take(this.timeLimit + 1),

        // 倒扣時間
        map(tickTime => ({ currentTime: this.timeLimit - tickTime })),

        // 計算計時器外圈剩餘長度跟輸出當前時間
        tap(tickTimer => {
          this.timeLeft = this.timeLimit - (this.timeLimit - tickTimer.currentTime);
          this.setCircleDasharray();
          this.setCounterSize();
          this.timeEmitter.emit(tickTimer.currentTime);
        })
      );
  }

  /**
   * 計算並設置計時器外圈剩餘長度
   * @returns void
   */
  private setCircleDasharray(): void {
    // 計算剩餘長度
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;

    // 設置剩餘長度
    if (this.baseTimerPathRemaining) {
      this.baseTimerPathRemaining.nativeElement.setAttribute('stroke-dasharray', circleDasharray);
    }
  }

  /**
   * 計算計時器外圈剩餘長度
   * @returns number
   */
  private calculateTimeFraction(): number {
    // 剩餘時間除總時
    const rawTimeFraction = this.timeLeft / this.timeLimit;

    return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
  }

  /**
   * 設置計時器的尺寸
   * @returns void
   */
  private setCounterSize(): void {
    const circleTimerStyle = this.circleTimer?.nativeElement.style;

    if (!this.timerSize) {
      const grandParentStyle = this.circleTimer?.nativeElement.parentNode.parentNode.style;

      if (grandParentStyle.height) {
        circleTimerStyle.height = '100%';

        if (this.timeLeft < 60) {
          this.fontSize = `${parseInt(grandParentStyle.height, 10) * 0.5}px`;
        } else if (this.timeLeft < 3600) {
          this.fontSize = `${parseInt(grandParentStyle.height, 10) * 0.3}px`;
        } else {
          this.fontSize = `${parseInt(grandParentStyle.height, 10) * 0.2}px`;
        }
      } else {
        circleTimerStyle.display = 'none';
      }
    } else {
      circleTimerStyle.height = `${this.timerSize}px`;

      if (this.timeLeft < 60) {
        this.fontSize = `${this.timerSize * 0.5}px`;
      } else if (this.timeLeft < 3600) {
        this.fontSize = `${this.timerSize * 0.3}px`;
      } else {
        this.fontSize = `${this.timerSize * 0.2}px`;
      }
    }
  }

  /**
   * 轉化秒數到時間格式
   * @returns: SecondToTime
   */
  private convertSecondsToTime(time: number): SecondToTime {
    const d = Math.floor(time / (3600 * 24));
    const h = Math.floor(time % (3600 * 24) / 3600);
    const m = Math.floor(time % 3600 / 60);
    const s = Math.floor(time % 60);

    return {
      currentDays: d.toString(),
      currentHours: ('0' + h).slice(-2),
      currentMinutes: ('0' + m).slice(-2),
      currentSeconds: ('0' + s).slice(-2),
    };
  }

  /**
   * 設定倒數文字格式
   * @returns string
   */
  getTimeFormated(time: number): string{

    const currentTime = this.convertSecondsToTime(time);

    if (time < 60) {
      return `${currentTime.currentSeconds}`;
    } else if (time < 3600) {
      return `${currentTime.currentMinutes}:${currentTime.currentSeconds}`;
    } else {
      return `${currentTime.currentHours}:${currentTime.currentMinutes}:${currentTime.currentSeconds}`;
    }
  }

  /**
   * 輸出是否重置時間
   * @returns void
   */
  onResetTimer(): void {
    this.resetTimeEmitter.emit(true);
  }
}

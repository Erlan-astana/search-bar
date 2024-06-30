import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[screenSize]',
  standalone: true
})
export class ScreenSizeDirective implements OnInit, OnDestroy {
  @Input() showOnMobile: boolean = true;
  private resizeSubscription!: Subscription;
  private readonly mobileWidth = 500;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.checkScreenSize();
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.checkScreenSize();
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    if (width <= this.mobileWidth) {
      if (this.showOnMobile) {
        this.renderer.removeStyle(this.el.nativeElement, 'display');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      }
    } else {
      if (this.showOnMobile) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'display');
      }
    }
  }
}

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SGEPCF';

  isCollapsed: boolean = false;

  ngAfterViewInit() {
    this.checkContentOverflow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkContentOverflow();
  }

  checkContentOverflow() {
    const contentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    this.isCollapsed = contentHeight > viewportHeight;
  }
}

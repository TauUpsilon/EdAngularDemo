import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') cssClass: any;

  title = 'Edward\'s Angular Demo';

  isDarkMode = false;

  constructor(
    private readonly titleService: Title,
    private readonly overlayContainer: OverlayContainer
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.setThemeMode('dark');
  }

  setThemeMode(mode: string): void {

    if (mode === 'light') {
      this.overlayContainer.getContainerElement().classList.remove('project-dark-theme');

      this.overlayContainer.getContainerElement().classList.add('project-light-theme');
      this.cssClass = 'project-light-theme';

      this.isDarkMode = false;
    } else {
      this.overlayContainer.getContainerElement().classList.remove('project-light-theme');

      this.overlayContainer.getContainerElement().classList.add('project-dark-theme');
      this.cssClass = 'project-dark-theme';

      this.isDarkMode = true;
    }
  }

  onModeClick(mode: string): void {
    this.setThemeMode(mode);
  }
}

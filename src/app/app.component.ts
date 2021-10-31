import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dev-abas';

  constructor(public matIconRegistry: MatIconRegistry,public domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon('icon-github', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/github.svg"));
    this.matIconRegistry.addSvgIcon('icon-linkedin', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/linkedin.svg"));
  }
}

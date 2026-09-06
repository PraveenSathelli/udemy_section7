import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  userType = input.required<Permission>({ alias: 'appAuth' });

  private authService = inject(AuthService);
  private templateRef= inject(TemplateRef);
  private viewCntainerRef = inject(ViewContainerRef);

  constructor() {

    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewCntainerRef.createEmbeddedView(this.templateRef);
        console.log("show")
      }
      else {
        this.viewCntainerRef.clear();
        console.log('do not show');
      }
    })

  }

}

import { Directive, ElementRef, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appAccessControl]',
})
export class AccessControlDirective implements OnInit {
  constructor(
    private loginService: LoginService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkAccess();
  }

  checkAccess() {
    const accessControls: any = this.loginService.getRole();
    if (accessControls === 'READER') {
      this.elementRef.nativeElement.style.display = 'none';
    } else {
      this.elementRef.nativeElement.style.display = 'block';
    }
  }
}

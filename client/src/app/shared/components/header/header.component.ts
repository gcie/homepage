import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/api/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger('openClose', [
            state(
                'open',
                style({
                    backgroundColor: '{{ color }}',
                }),
                { params: { color: '#ffffff' } }
            ),
            state(
                'closed',
                style({
                    backgroundColor: '{{ color }}',
                }),
                { params: { color: '#ffffff' } }
            ),
            transition('open => closed', [animate('1s')]),
            transition('closed => open', [animate('0.5s')]),
        ]),
    ],
})
export class HeaderComponent implements AfterViewInit {
    public colorMode = 'open';

    @Input() title;
    @Input() noMenu = false;

    @Output() OnMenuTrigger = new EventEmitter();

    @ViewChild('toolbar') toolbar: MatToolbar;
    @ViewChild('primaryDarkColorRef') primaryDarkColorRef: MatButton;

    constructor(private router: Router, public authService: AuthService, private userService: UserService) {}

    ngAfterViewInit() {
        console.log(this.primaryDarkColorRef);
    }

    loginRedirect() {
        this.authService.loginRedirect(this.router.routerState.snapshot.url);
    }

    redirect(route?: string) {
        this.router.navigateByUrl('/' + (route || ''));
    }

    logout() {
        this.authService.logout();
    }

    test() {
        this.userService.getGravatarURI().subscribe({
            next: console.log,
            error: console.error,
        });
    }

    public changeColorScheme(dark = false) {
        // if (dark) {
        //     // this.toolbar._elementRef.nativeElement.style;
        //     this.toolbar.color = 'accent';
        // } else {
        //     this.toolbar.color = 'primary';
        // }
    }
}

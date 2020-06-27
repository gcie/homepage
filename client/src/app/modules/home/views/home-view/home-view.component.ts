import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService, User } from 'src/app/core/auth';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit, OnDestroy {
    user: User;
    loggedIn: boolean;

    @ViewChild('header') header: HeaderComponent;

    constructor(private authService: AuthService) {
        const user = this.authService.getUser();
        this.loggedIn = this.authService.isLoggedIn();
        if (user) this.user = user;
        console.log(user);
    }

    ngOnInit(): void {
        window.addEventListener('scroll', this.scrollHandler, true);
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.scrollHandler, true);
    }

    logout() {
        this.authService.logout();
    }

    scrollHandler = (event: Event) => {
        const trg: any = event.target;
        console.log(trg.scrollTop);
        if (trg.scrollTop === 0) {
            this.header.colorMode = 'open';
            // this.header.changeColorScheme(false);
        } else {
            this.header.colorMode = 'closed';
            // this.header.changeColorScheme(true);
        }
        // console.log(this.loggedIn);
    };
}

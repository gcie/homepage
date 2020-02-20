import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';
import { Pupil, Tutor } from 'src/app/shared/models';
import { TutorsListComponent, PupilsListComponent } from '../../components';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePageComponent {
    @ViewChild('detailsSidenav') detailsSidenav: MatSidenav;
    @ViewChild('tutorsList') tutorsList: TutorsListComponent;
    @ViewChild('pupilsList') pupilsList: PupilsListComponent;

    username?: string;
    selectedPupil?: Pupil;
    selectedTutor?: Tutor;

    constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
        this.username = this.authService.getName();
    }

    refreshLists() {
        this.tutorsList.refreshTutorsList();
        this.pupilsList.refreshPupilsList();
    }

    showPupilDetails(pupil: Pupil) {
        this.selectedPupil = pupil;
        this.selectedTutor = undefined;
        this.detailsSidenav.toggle();
    }

    showTutorDetails(tutor: Tutor) {
        this.selectedPupil = undefined;
        this.selectedTutor = tutor;
        this.detailsSidenav.toggle();
    }

    registerRedirect() {
        this.router.navigateByUrl('register');
    }

    userRedirect() {
        this.http.get('/user').subscribe(console.log);
    }
}

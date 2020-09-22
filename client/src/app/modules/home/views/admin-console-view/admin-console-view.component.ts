import { Component, OnInit } from '@angular/core';
import { PermissionGroup } from 'src/app/core/models/permission-group.enum';

@Component({
    selector: 'app-admin-console-view',
    templateUrl: './admin-console-view.component.html',
    styleUrls: ['./admin-console-view.component.scss'],
})
export class AdminConsoleViewComponent implements OnInit {
    selectedGroup: PermissionGroup;
    permissionGroups = Object.keys(PermissionGroup).map((key) => PermissionGroup[key]);

    constructor() {}

    ngOnInit(): void {}
}

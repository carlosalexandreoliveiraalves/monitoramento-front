import { Home } from './core/template/home/home';
import { Device } from './modules/device/device/device';
import { Property } from './modules/property/property/property';
import { Sensor } from './modules/sensor/sensor/sensor';
import { User } from './modules/user/user/user';
import { LandingPage } from './public/landing-page/landing-page';
import { Routes } from '@angular/router';
import { NotFound } from './public/not-found/not-found';
import { Dashboard } from './modules/dashboard/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: Dashboard
            },
            {
                path: 'user',
                component: User
            },
            {
                path: 'device',
                component: Device
            },
            {
                path: 'property',
                component: Property
            },
            {
                path: 'sensor',
                component: Sensor
            }
        ]
    },
    {
        path: '**',
        component: NotFound
    }
];

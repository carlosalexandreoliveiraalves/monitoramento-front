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
import { PersonList } from './modules/user/components/person-list/person-list';
import { PersonForm } from './modules/user/components/person-form/person-form';
import { PropertyList } from './modules/property/components/property-list/property-list';
import { DeviceList } from './modules/device/components/device-list/device-list';
import { SensorList } from './modules/sensor/components/sensor-list/sensor-list';

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
                path: 'person',
                component: User,
                children: [
                    { path: '', component: PersonList },     // Lista
                ]
            },
            {
                path: 'device',
                component: Device,
                children: [
                    { path: '', component: DeviceList },     // Lista
                ]
            },
            {
                path: 'property',
                component: Property,
                children: [
                    { path: '', component: PropertyList },     // Lista
                ]
            },
            {
                path: 'sensor',
                component: Sensor,
                children: [
                    { path: '', component: SensorList },     // Lista
                ]
            }
        ]
    },
    {
        path: '**',
        component: NotFound
    }
];

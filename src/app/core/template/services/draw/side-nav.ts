import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  //Usando signal
  public sideNavOpen = signal<boolean>(false);


  toogleSideNav() {
    this.sideNavOpen.update(value => !value);
  }

  setSideNavState(state: boolean) {
    this.sideNavOpen.set(state);
  }

}

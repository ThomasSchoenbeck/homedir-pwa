import { trigger, transition, style, query, group, animate } from '@angular/animations';

const toTheRight = [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '0',
        right: 0,
        width: '100%',
      })
    ]),
    query(':enter', [
      style({ right: '-100%',  })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ right: '100%', }))
      ]),
      query(':enter', [
        animate('600ms ease', style({ right: '0%'}))
      ])
    ]),
  ];
const toTheLeft = [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '0',
        left: 0,
        width: '100%',
      })
    ]),
    query(':enter', [
      style({ left: '-100%',  })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ left: '100%', }))
      ]),
      query(':enter', [
        animate('600ms ease', style({ left: '0%'}))
      ])
    ]),
  ];


export const slider =
  trigger('routeAnimations', [

    transition('Login => Dashboard', toTheRight ),
    transition('Login => List', toTheRight ),
    transition('Login => Profile', toTheRight ),

    transition('Dashboard => List', toTheRight ),
    transition('Dashboard => Profile', toTheRight ),
    transition('Dashboard => Login', toTheRight ),

    transition('List => Dashboard', toTheLeft ),
    transition('List => Profile', toTheRight ),
    transition('List => Login', toTheRight ),


    transition('Profile => Dashboard', toTheLeft ),
    transition('Profile => List', toTheLeft ),
    transition('Profile => Login', toTheLeft ),


]);

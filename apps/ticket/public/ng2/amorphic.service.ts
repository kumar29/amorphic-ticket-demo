import {Injectable} from '@angular/core';

//import {Controller} from '../js/controller';
import {WindowService} from './window.service';

@Injectable()
export class AmorphicService {

    controller: any;

    constructor(private windowService: WindowService) {
        this.controller = this.windowService.nativeWindow.controller;
    }
}
import { Injectable } from '@angular/core';

@Injectable()
export class FormatService {

    e(value): string {
        value = Math.floor(value);
        if (value > 10000) {
            let str = value.toString();
            return Math.floor(value / 1000) + ' ' + str.substr(-3) + ' €';
        }
        return value.toFixed(2) + ' €';
    }

    pc(value): string {
        return (value * 100).toFixed(2) + ' %';
    }
}
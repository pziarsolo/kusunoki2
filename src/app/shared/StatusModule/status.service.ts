import {Injectable} from '@angular/core';

import { Observable ,  Subject } from 'rxjs';

import {StatusLevels} from './status-levels.enum';
import {Status} from './status.class';


@Injectable({
    providedIn: 'root',
})
export class StatusService {

    private _level = StatusLevels.INFO;
    private subject = new Subject<any>();

    constructor() {}

    public error(message: string, obj?) {
        this.action(StatusLevels.ERROR, message, obj);
    }

    public warn(message: string, obj?) {
        this.action(StatusLevels.WARN, message, obj);
    }

    public info(message: string, obj?) {
        this.action(StatusLevels.INFO, message, obj);
    }

    public success(message: string, obj?) {
        this.action(StatusLevels.INFO, message, obj, true);
    }

    public set level(level: StatusLevels) {
        this._level = level;
    }

    public get level() {
        return this._level;
    }

    public action(level: StatusLevels, message: string, obj?, success?: boolean) {
        if (this.level <= level) {
            const consoleMethod = this.getConsoleMethod(level);
            if (!obj) {
                consoleMethod(message);
            } else {
                consoleMethod(message, obj);
            }

            this.vibrate(level);

            const resp: Status = new Status();
            resp.message = message;
            resp.level = level;
            resp.obj = obj;
            resp.success = success;

            /* Este es el punto en el que se emite el valor del mensaje, ya que se realiza el next y en el siguiente método
             * es donde se hace el return de lo que se querrá mostrar como Observable, pudiendo de esta forma Suscribirnos al mismo
             * y entonces ejecutar la acción que muestra nuestro componente Pop-Up */
            this.subject.next({ resp });
            this.getMessage();
        }
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    private getConsoleMethod(level: StatusLevels) {
        switch (level) {
            case StatusLevels.FATAL:
            case StatusLevels.ERROR:
                return console.error;
            case StatusLevels.WARN:
                return console.warn;
            case StatusLevels.INFO:
                return console.info;
            default:
                return console.log;
        }
    }

    private vibrate(level: StatusLevels) {
        if (level >= StatusLevels.WARN) {
            if (navigator && navigator.vibrate) {
                try {
                    navigator.vibrate(this.getVibratePattern(level));
                } catch (e) {
                    console.warn('navigator.vibrate has thrown an error. Has this experimental HTML5 API changed?');
                    console.warn(e);
                }
            }
        }
    }

    private getVibratePattern(level: StatusLevels) {
        switch (level) {
            case StatusLevels.ERROR:
                return [300];
            case StatusLevels.WARN:
                return [100];
            default:
                return [];
        }
    }
}

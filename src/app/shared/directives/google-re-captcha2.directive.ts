import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare const grecaptcha: any;

declare global {
    interface Window {
        grecaptcha: any;
        reCaptchaLoad: () => void
    }
}

export interface ReCaptchaConfig {
    theme?: 'dark' | 'light';
    type?: 'audio' | 'image';
    size?: 'compact' | 'normal';
    tabindex?: number;
}

@Directive({
    selector: '[kusunoki2GoogleReCaptcha2Directive]',
    exportAs: 'kusunoki2GoogleReCaptcha2',

})
export class GoogleReCaptcha2Directive implements OnInit {
    @Input() key: string;
    @Input() config: ReCaptchaConfig = {};
    @Input() lang: string;

    @Output() validationStateEvent = new EventEmitter<any>();
    @Output() captchaExpired = new EventEmitter();

    public validToken: string;
    private widgetId: number;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.registerReCaptchaCallback();
        this.addScript();
        this.validationStateEvent.emit({'captcha': false});
    }

    registerReCaptchaCallback() {
        window.reCaptchaLoad = () => {
            const config = {
                ...this.config,
                'sitekey': this.key,
                'callback': this.onSuccess.bind(this),
                'expired-callback': this.onExpired.bind(this)
            };
            this.widgetId = this.render(this.element.nativeElement, config);
        };
    }
    addScript() {
        const script = document.createElement('script');
        const lang = this.lang ? '&hl=' + this.lang : '';
        script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
    getId() {
        return this.widgetId;
    }

    onExpired() {
        this.captchaExpired.emit();
        console.log('expire');
        this.validationStateEvent.emit({'captcha': false });
        this.validToken = undefined;
    }

    onSuccess(token: string) {
        this.validationStateEvent.emit({'captcha': true });
        this.validToken = token;

    }
    getValueIfFormValid(): string {
        if (this.validToken !== undefined) {
            return this.validToken;
        }
    }

    private render(element: HTMLElement, config): number {
        return grecaptcha.render(element, config);
    }
}

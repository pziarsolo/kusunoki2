import { HttpParams } from '@angular/common/http';

export function paramsToHttpParams(search_params?: object) {
    let get_params = new HttpParams();

    if (search_params) {
        for (const key of Object.keys(search_params)) {
            const value = search_params[key];
            if (value !== undefined && value !== null) {
                get_params = get_params.append(key, value);
            }
        }
    }
    return get_params;
}

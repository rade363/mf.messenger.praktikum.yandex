export function isEmpty(value: unknown): boolean {
    return value === undefined || value === null || value === "";
}

export function isXssPresent(textString: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regexp = /<[^\w<>]*(?:[^<>"'\s]*:)?[^\w<>]*(?:\W*s\W*c\W*r\W*i\W*p\W*t|\W*f\W*o\W*r\W*m|\W*s\W*t\W*y\W*l\W*e|\W*s\W*v\W*g|\W*m\W*a\W*r\W*q\W*u\W*e\W*e|(?:\W*l\W*i\W*n\W*k|\W*o\W*b\W*j\W*e\W*c\W*t|\W*e\W*m\W*b\W*e\W*d|\W*a\W*p\W*p\W*l\W*e\W*t|\W*p\W*a\W*r\W*a\W*m|\W*i?\W*f\W*r\W*a\W*m\W*e|\W*b\W*a\W*s\W*e|\W*b\W*o\W*d\W*y|\W*m\W*e\W*t\W*a|\W*i\W*m\W*a?\W*g\W*e?|\W*v\W*i\W*d\W*e\W*o|\W*a\W*u\W*d\W*i\W*o|\W*b\W*i\W*n\W*d\W*i\W*n\W*g\W*s|\W*s\W*e\W*t|\W*i\W*s\W*i\W*n\W*d\W*e\W*x|\W*a\W*n\W*i\W*m\W*a\W*t\W*e)[^>\w])|(?:<\w[\s\S]*[\s\0\/]|['"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\s\0]*=/gi;
    return textString.search(regexp) > -1;
}

export function generateUniqueId(): string {
    return `_${Math.random().toString(36).substr(2, 20)}`;
}

export function isPlainObject(item: unknown): boolean {
    return item !== null && item !== undefined && typeof item === "object" && !Array.isArray(item);
}

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export function getResponseErrorText(payload: XMLHttpRequest): string | TObjectType {
    const parsedPayload = JSON.parse(payload.response);
    return parsedPayload.reason ? parsedPayload.reason : parsedPayload;
}

export function isEmailValid(string: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegexp.test(string);
}

export function areObjectsEqual(a: TObjectType, b: TObjectType): boolean {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in a) {
        // eslint-disable-next-line no-prototype-builtins
        if (a.hasOwnProperty(key)) {
            // eslint-disable-next-line no-prototype-builtins
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            if (typeof a[key] !== typeof b[key]) {
                return false;
            }
            if (Array.isArray(a[key])) {
                if (a[key].length !== b[key].length) {
                    return false;
                }
                const areArraysEqual = areObjectsEqual(a[key], b[key]);
                if (!areArraysEqual) {
                    return false;
                }
            } else if (isPlainObject(a[key]) && isPlainObject(b[key])) {
                const objectsEqual = areObjectsEqual(a[key], b[key]);
                if (!objectsEqual) {
                    return false;
                }
            } else if (a[key] !== b[key]) {
                return false;
            }
        }
    }

    return true;
}

export function createObjectWithoutPrivateProps(obj: TObjectType): TObjectType {
    if (!isPlainObject(obj)) {
        return obj;
    }
    const publicObj: TObjectType = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && key.indexOf("_") !== 0) {
            publicObj[key] = obj[key];
        }
    }
    return publicObj;
}

export function getTime(timeStamp: string): string {
    const date = new Date(timeStamp);
    const hours = date.getHours();
    const hh = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = date.getMinutes();
    const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hh}:${mm}`;
}

export function createUsername(user: IUser): string {
    if (user.display_name) {
        return user.display_name;
    }
    if (!user.first_name && !user.second_name) {
        return user.login;
    }
    const firstName = user.first_name ? user.first_name : "";
    const lastName = user.second_name ? user.second_name : "";
    return `${firstName}${firstName !== "" ? ` ${lastName}` : lastName}`;
}

export function isChatGroup(title: string): boolean {
    return title.indexOf("Group:") === 0;
}

export function filterCurrentUserFromTitle(title: string, currentUser: IUser): string {
    if (isChatGroup(title)) {
        return title;
    }

    if (typeof currentUser.display_name === "string" && title.indexOf(currentUser.display_name) > -1) {
        return title.replace(currentUser.display_name, "").trim();
    }

    if (title.indexOf(currentUser.login) > -1) {
        return title.replace(currentUser.login, "").trim();
    }

    let temp = title;
    if (currentUser.first_name && temp.indexOf(currentUser.first_name) > -1) {
        temp = temp.replace(currentUser.first_name, "").trim();
    }
    if (currentUser.second_name && temp.indexOf(currentUser.second_name) > -1) {
        temp = temp.replace(currentUser.second_name, "").trim();
    }
    return temp;
}

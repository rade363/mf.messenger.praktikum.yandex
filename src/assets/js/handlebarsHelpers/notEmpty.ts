import { isEmpty } from "../modules/helpers";

export default function notEmpty(a: unknown, opts: TObjectType): unknown {
    return !isEmpty(a) ? opts.fn(this) : opts.inverse(this);
}

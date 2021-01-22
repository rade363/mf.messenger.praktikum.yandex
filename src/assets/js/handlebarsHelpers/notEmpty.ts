import { isEmpty } from "../modules/utils";

export default function notEmpty(a: unknown, opts: TObjectType): unknown {
    return !isEmpty(a) ? opts.fn(this) : opts.inverse(this);
}

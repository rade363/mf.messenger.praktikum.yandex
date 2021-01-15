export default function isTrue(a: boolean, opts: TObjectType): unknown {
    return a === true ? opts.fn(this) : opts.inverse(this);
}

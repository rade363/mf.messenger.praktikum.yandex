export default function gt(a: number, b: number, opts: TObjectType): unknown {
    return a > b ? opts.fn(this) : opts.inverse(this);
}

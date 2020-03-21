export default function get(
    obj,
    path,
    defaultValue
) {
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return (result === undefined || result === obj ? defaultValue : result);

    function travel(regexp) {
        return String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    }
}
/**
 * Wrapper function that returns a JSON object for a SWF file.
 * Used mostly for the known named parameters.
 *
 * @deprecated
 *
 * @param {*} param0 
 * @returns {object} SWF file JSON object
 */
const makeSwfJSON = ({
    avm = 0,
    name = "",
    md5_hash = "",
    path = "",
    type = "",
    size = 0,
    lp = "",
    status = "",
    url = "",
}) => {
    return {
        avm,
        name,
        md5_hash,
        path,
        type,
        size,
        lp,
        status,
        url,
    };
};


export { makeSwfJSON };
let sha256 = require('sha256')

export const ksort = function ( src ) {
    let keys = Object.keys( src ),
        target = {};
    keys.sort();
    keys.forEach(function ( key ) {
        target[ key ] = src[ key ];
    });
    return target;
};

export const hashing256 = (text, key) => {
    return sha256(text + key);
}

export const GenHash = (arr, secretKey) =>{
    let a = [];
    let hashcode = "";
    let md5hash;

    for(let k in arr){
        let temp = k.toLowerCase();

        a[temp] = arr[k];
    }

    let c = ksort(a);

    for(let sorted_key in c){
        if(sorted_key !== 'hash' && sorted_key !== 'logid'){
            hashcode += c[sorted_key];
        }
    }
    
    hashcode = hashcode + secretKey;
    
    md5hash = sha256(hashcode);

    return md5hash;
}

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
    },
    signout(cb) {
        this.isAuthenticated = false
    }
}

export const fieldChecking = (form) =>{
    for(let i=0; i < form.elements.length; i++){

        if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            return false;
        }
        if(Array.from(form.elements[i].classList).includes('is-invalid')){
            return false;
        }
    }

    return true;
}

export const toFixedTrunc = (x, n) =>{
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
}

export const amountChecking8 = (value) =>{

    if ((/^(\d+(\.\d{0,8})?|\.?\d{1,2})$/.test(value)) || value === ""){
        return true;
    }

    return false;
}

export const amountChecking2 = (value) =>{

    if (/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(value) || value === ""){
        return true;
    }

    return false;
}

export const amountChecking1 = (value) =>{

    if (/^(\d+(\.\d{0,0})?|\.?\d{1,2})$/.test(value) || value === ""){
        return true;
    }

    return false;
}

export const slice_decimal_wt_rounding = (value, decimal) => {

    var matcher = /^-?\d+(?:\.\d{0,8})?/;

    switch (decimal){
        case 2 : matcher = /^-?\d+(?:\.\d{0,2})?/;
        break;
        case 8 : matcher = /^-?\d+(?:\.\d{0,8})?/;
        break;
        default: matcher = /^-?\d+(?:\.\d{0,8})?/;
        break;
    }

    var num = value, rounded;
    var with2Decimals = num.toString().match(matcher)[0];

    rounded = with2Decimals;

    value =  rounded * 1;

    return  value.toString();
}

export const parseFloatV2 = (value) => {

    value = value * 1;

    return  value;
}

export const delimiter = (value) => {

    value = value.toString();

    value = value.replace(new RegExp(',', 'g'),'');

    return  value;
}
import { Base64 } from 'js-base64';
export default (context, inject) => {
    context.$Base64 = Base64;
    inject("Base64", Base64);
}
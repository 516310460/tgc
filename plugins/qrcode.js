import QRCode from "qrcode";
import html2canvas from 'html2canvas'
export default (context, inject) => {
  context.$html2canvas = html2canvas;
  inject("html2canvas", html2canvas);
  context.$QRCode = QRCode;
  inject("QRCode", QRCode);
}

import { playSound,sounds } from "./sounds";

export function show(selector) {
  if (isNative()) {
    if(!$(selector)[0].hasAttribute("open"))
      $(selector)[0].showModal();
  } else {
    $(selector)[0].setAttribute('open','');
    $("#backdrop")[0].style.display = "block";
  }
}

export function hide(selector) {
    if (isNative()) {
        $(selector)[0].close();
    } else {
        $(selector)[0].removeAttribute('open');
        $("#backdrop")[0].style.display = "none";
    }
    playSound(sounds.start);
}

function isNative(){
    //Native is not supported by FF yet :(
    return typeof HTMLDialogElement === 'function';
}
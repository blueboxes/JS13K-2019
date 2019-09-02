export function show(selector) {
  if (isNative()) {
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
}

function isNative(){
    //Native is not supported by FF yet :(
    return typeof HTMLDialogElement === 'function';
}
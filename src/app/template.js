
//Quick replace of all keys with values in html
//so pass in an object of {score:999} and html <div>Score: {{score}}</div> to get <div>Score: 999</div>
export function applyTemplate(source, sourceSelector, targetSelector) {
    let html = $(sourceSelector)[0].innerHTML
    Object.keys(source).forEach((key)=>html = html.replace('{{' + key + '}}',source[key]))
    $(targetSelector)[0].innerHTML = html;
}
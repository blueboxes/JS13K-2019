
export function getLevelMessage(level,flights,mode)
{
    if(mode=='free'){
        if(flights == 0)
            return '';
        if(flights == 1)
            return 'First flight compelted!'

        return flights + ' flights compelted so far!'
    }
    
    const messages = [
        {lvl:1,msg:'welcome this is a test'},
        {lvl:3,msg:'you got to level 3'}
    ];

    let message = messages.find((m)=>m.lvl==level);
    return message!=null ? message.msg : '';
}

export function getStatusMessage(status)
{
    const messages = [
        {state:'out',msg:'Flying out bound, memorize the route...'},
        {state:'back',msg:'Plot the same route back.'},
        {state:'show',msg:'Brace for impact...'},
        {state:'levelup',msg:'Your going places!'},
        {state:'new',msg:''},
        {state:'over',msg:''}
    ];

    let message = messages.find((m)=>m.state==status);
    return message!=null ? message.msg : status;
}
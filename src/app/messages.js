
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
        {lvl:1,msg:'Welcome to pilot flight school. The instructor will show you the route, then just follow the route back and try not to crash the plane!'},
        {lvl:2,msg:'Let’s try it again before moving on to a harder route.'},
        {lvl:3,msg:'You have made it past the third flight, lets now make the route a bit longer…'},
        {lvl:5,msg:'Did you know if you forget the route you can re-wind up to 3 times by using the flags in the top corner.'},
        {lvl:9,msg:'A lot of pilots do not make it this far, time to make it a bit harder.'},
        {lvl:10,msg:'Level 10, that is impressive. You are out pacing the other students in your class. Have another plane to help you out.'},
        {lvl:15,msg:'Wow you are acing this, you will be flying longer routes soon.'},
        {lvl:30,msg:'To be honest I did not thing anyone would fly this many flights!'},
    ];

    let message = messages.find((m)=>m.lvl==level);
    return message!=null ? message.msg : '';
}

export function getStatusMessage(status)
{
    const messages = [
        {state:'out',msg:'Memorize the route...'},
        {state:'pending',msg:'Route set please wait...'},
        {state:'back',msg:'Plot the same route back.'},
        {state:'show',msg:'Plane down, try again...'},
        {state:'levelup',msg:'Your going places!'},
        {state:'new',msg:''},
        {state:'over',msg:''}
    ];

    let message = messages.find((m)=>m.state==status);
    return message!=null ? message.msg : status;
}


//  THIS MODULE EXPORTS DATE AND DAY
/*
module.exports.getDate =getdate;

function getdate()
{
    var date= new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var currentDate=date.toLocaleDateString('en-US',options);
    
    return currentDate;
}
*/

//  CODE REFACTURING
// CONVERTING TO UNANIMOUS FUNCTION
module.exports.getDate =function()
{
    var date= new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var currentDate=date.toLocaleDateString('en-US',options);
    
    return currentDate;
};

module.exports.getDay=getday;

function getday()
{
    var date= new Date();
    var options = { weekday: 'long' };
    var currentDay=date.toLocaleDateString('en-US',options);
    
    return currentDay;
}
console.log(module.exports);
let theWheel = new Winwheel({
    'canvasId'    : 'myCanvas',
    'numSegments' : 8,
    'lineWidth'   : 0,
    'segments'     :        // Define segments including colour and text.
        [
            {'fillStyle' : '#18c9f5', 'text' : '3%','textFontSize' : 30},//Диапазон значений 0-30
            {'fillStyle' : '#00376e', 'text' : '100₽','textFontSize' : 30},//Диапазон значений 35-60
            {'fillStyle' : '#f84b25', 'text' : '5%','textFontSize' : 30},//Диапазон значений 70-100
            {'fillStyle' : '#00b88f', 'text' : '150₽','textFontSize' : 30},//Диапазон значений 120-140
            {'fillStyle' : '#18c9f5', 'text' : '7%','textFontSize' : 30},//Диапазон значений 180-200
            {'fillStyle' : '#00376e', 'text' : '200₽','textFontSize' : 30},//Диапазон значений 225-245
            {'fillStyle' : '#f84b25', 'text' : '9%','textFontSize' : 30},//Диапазон значений 270-290
            {'fillStyle' : '#00b88f', 'text' : '50₽','textFontSize' : 30}//Диапазон значений 320
        ],
    'animation' :           // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 2,     // Duration in seconds.
            'spins'    : 2,     // Number of complete spins.
            'callbackFinished' : alertPrize
        },
    'textFillStyle' : '#ffffff',
    'strokeStyle' : '#ffffff00',
});
function startSpin(stopAt)
{
    theWheel.animation.stopAngle = theWheel.getRandomForSegment(stopAt);
    theWheel.startAnimation();
};
function alertPrize(indicatedSegment)
{
    // кладём результат в переменную и выводим перед кнопкой.
    let prize = '<div class=\"prize-rezult\">Поздравляем! Ваш выигрыш - '+indicatedSegment.text+'!</div>';
    $("#submit_luck").before(prize);
    //console.log(prize);
    // Удаляем кнопку после нажатия
    //document.getElementById('spin_button').remove()

}

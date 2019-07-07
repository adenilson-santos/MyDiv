var containerW = 250
var containerH = 450

var photoW = 85
var photoH = 85

window.onload = () => {
    var myDiv = new MyDiv({
        container: '.container',
        width: containerW,
        height: containerH
    }).create()

    myDiv.createChild({
        width: photoW,
        height: photoH,
        x: (containerW/2) - (photoW /2),
        y: 150
    })
    console.log((containerW), (containerW/2))
    console.log((containerW/2), (photoW /2))
    console.log((containerW/2) - (photoW /2))

    myDiv.updateSize({
        width: 150
    })

}


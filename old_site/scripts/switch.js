function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Switch(onElem, offElem) {
    this.ANIMATION_DELAY = 500;
    this.ANIMATION_IN = "ease-in";
    this.ANIMATION_OUT = "ease-out";
    this.BLINK_INTERVAL = 200;

    this.onElem = onElem;
    this.offElem = offElem;

    this.notFoundBlock = "#not-found";
    this.eye = "#turn";
    this.text = "#text-to-turn";
    this.staticEye = "#static-eye";
    this.animatedEye = ".animated-eye";

    this.turnedOn = true;
    this.blackSquare = "#black-square";

    this.nav = "nav";
    this.hiddenElems = ["#pay"];
    this.hiddenElemsIntervals = [];

    this.selfClearTimer;

    this.init();
}

Switch.prototype.init = function() {
    $(this.onElem).on("click", () => {
        this.switchToogle()
    });

    $(this.offElem).on("click", () => {
        this.switchToogle()
    });
}

Switch.prototype.turnOn = function() {
    console.log("Turn on")

    this.selfClearTimer = setInterval(() => {
        if (this.turnedOn) {
            this.hiddenElemsReset();
        }
    }, 200);

    this.hiddenElemsReset();

    $(this.notFoundBlock).animate(
        {
            opacity: "0"
        }, 
        this.ANIMATION_DELAY, 
        () => {
            $(this.notFoundBlock).removeClass("on-top");

            $(this.staticEye).css({"display":"block"});
            $(this.animatedEye).css({"display":"none"});
            $(this.text).css({"visibility":"visible"});

            $(this.notFoundBlock).css({"visibility":"visible", "opacity":"1"});

            $(this.blackSquare).animate(
                { opacity: "0" },
                this.ANIMATION_DELAY, 
                () => {
                    $(this.blackSquare).css({"height":"0"})
                },
                this.ANIMATION_OUT
            )
        },
        this.ANIMATION_OUT
    );

    this.turnedOn = true;
}

Switch.prototype.turnOff = function() {
    console.log("Turn off")

    $(this.blackSquare).css({"opacity":"0", "height": "100%"});
    $(this.blackSquare).animate(
        {
            "opacity":"1"
        },
        this.ANIMATION_DELAY, 
        () => {
            $(this.staticEye).css({"display":"none"});
            $(this.animatedEye).css({"display":"block"});

            $(this.text).css({"visibility":"hidden"});
            $(this.notFoundBlock).css({"visibility":"hidden", "opacity":"0"});
            $(this.notFoundBlock).addClass("on-top");
            $(this.notFoundBlock).animate({
                visibility: "visible",
                opacity: "1"
            }, this.ANIMATION_DELAY, this.ANIMATION_IN)
            
            setTimeout(() => {
                this.hiddenElemsOnTop()
                this.blinkHiddenElems()
            }, 1000);
        },
        this.ANIMATION_IN
    )

    this.turnedOn = false;
}

Switch.prototype.hiddenElemsOnTop = function() {
    for (var i = this.hiddenElems.length - 1; i >= 0; i--) {
        $(this.hiddenElems[i]).css({"opacity":"0"});
        $(this.hiddenElems[i]).parent().addClass("on-top");
        $(this.hiddenElems[i]).css({"color": "white"});

        $(this.hiddenElems[i]).css({
            "text-shadow": "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228DFF, 0 0 35px #228DFF, 0 0 40px #228DFF, 0 0 50px #228DFF, 0 0 75px #228DFF"
        });
    }
}

Switch.prototype.hiddenElemsReset = function() {
    for (var i = this.hiddenElems.length - 1; i >= 0; i--) {
        $(this.hiddenElems[i]).css({"opacity":"0"});
        $(this.hiddenElems[i]).css({"color":"#eee"});
        $(this.hiddenElems[i]).parent().removeClass("on-top");

        clearInterval(this.hiddenElemsIntervals[i]);
    }

    this.hiddenElemsIntervals = [];
}

Switch.prototype.blinkHiddenElems = function() {
    this.hiddenElems.forEach((elem, i) => {
        var interval = setInterval(
            () => {
                var r = getRandomInt(0, 10);
                if(r >= 3) {
                    $(elem).animate({opacity:"1"}, getRandomInt(0, 100), this.ANIMATION_IN);
                }
                else {
                    $(elem).animate({opacity:"0"}, getRandomInt(0, 100), this.ANIMATION_OUT);
                }
            },
            this.BLINK_INTERVAL
        )
        this.hiddenElemsIntervals.push(interval);
    });
}

Switch.prototype.switchToogle = function() {
    if (this.turnedOn) {
        this.turnOff();
    } else {
        this.turnOn();
    }
}

Zepto(function($) {
    var switcher = new Switch("#turn-on", "#turn-off");
});
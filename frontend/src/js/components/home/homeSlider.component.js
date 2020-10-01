class homeSliderCtrl {
    constructor(){
        "ngInject";
        this.imgInterval = 5000;
        this.noWrapSlides = false;
        this.active = 0;

        this.slides = [
            {image:'https://i.pinimg.com/originals/86/ff/b8/86ffb87572d657f335cd7cd828c70de3.jpg',text:"Share your content",id:0},
            {image:'https://i.pinimg.com/originals/99/f7/6b/99f76b3de162688defe73255366828e2.jpg',text:"Night City",id:1}
        ]
    }
}

let HomeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'components/home/homeSlider.html'
};

export default HomeSlider;
class homeSliderCtrl {
    constructor(){
        "ngInject";
        this.imgInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [
            {image:'images/night_city.jpg',text:"Share your content",id:0}
            // {image:'/images/night_city.jpg',text:"Night City",id:1}
        ]
    }
}

let HomeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'components/home/homeSlider.html'
};

export default HomeSlider;
const path = require('path');
const pagePath = path.join(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - Check container '.slider-wrapper'
        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.slider-wrapper');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slider-wrapper element.`)
        }),

        // Test 2 - Check container '.slider'

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.slider');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slider element.`)
        }),

        // Test 3 - Check h1 element
        this.page.execute(() => {
            this.mainTitle = document.getElementsByTagName('h1');
            return this.mainTitle ?
                correct() :
                wrong(`Your page must contain main title`)
        }),

        // Test 4 - Check width and height of container 'slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                let neededSliderHeight = Math.round(window.innerHeight / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);
                neededSliderHeight = neededSliderHeight < 240 ? 240 : (neededSliderHeight > 600 ? 600 : neededSliderHeight);

                return {
                    'width': slider.getBoundingClientRect().width,
                    'height': slider.getBoundingClientRect().height,
                    'neededWidth': neededSliderWidth,
                    'neededHeight': neededSliderHeight
                }
            });

            return  Math.abs(slider.width - (slider.neededWidth+30)) < 2 && Math.abs(slider.height - (slider.neededHeight+30)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slider.width} and height=${slider.height},
         but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth+30} and height=${slider.neededHeight+30}`);
        }),


        // Test 5 - Check max-width 'slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);

                return {
                    'width': slider.getBoundingClientRect().width,
                    'neededWidth': neededSliderWidth
                }
            });

            return  Math.abs(slider.width - (slider.neededWidth+30)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slider.width},
         but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth+30}`);
        }),

        // Test 6 - Check container '.slide-1'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-1');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-1 container.`)
        }),

        // Test 7 - Check container '.slide-2'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-2');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-2 element.`)
        }),

        // Test 8 - Check container '.slide-3'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-3');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-3 element.`)
        }),

        // Test 9 - Check container 'slide' width
        this.node.execute(async () => {
            let slide = await this.page.evaluate(async () => {
                let slide = document.getElementsByClassName('slide')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);

                return {
                    'width': slide.getBoundingClientRect().width,
                    'neededWidth': neededSliderWidth
                }
            });

            return  Math.abs(slide.width - (slide.neededWidth)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slide (now you have width=${slide.width},
         but according to the dimensions of the window, its dimensions should be: width=${slide.neededWidth}`);
        }),

        // Test 10 - Check container 'slide' height
        this.node.execute(async () => {
            let slide = await this.page.evaluate(async () => {
                let slide = document.getElementsByClassName('slide')[0];
                let neededSliderHeight = Math.round(window.innerHeight / 100 * 75);
                neededSliderHeight = neededSliderHeight < 320 ? 320 : (neededSliderHeight > 800 ? 800 : neededSliderHeight);

                return {
                    'height': slide.getBoundingClientRect().height,
                    'neededHeight': neededSliderHeight
                }
            });

            return  Math.abs(slide.height - (slide.neededHeight+79)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slide (now you have height=${slide.height},
         but according to the dimensions of the window, its dimensions should be: height=${slide.neededHeight}`);
        }),

        // Test 11 - Check overflow x of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.overflowX === "auto" ?
                correct() :
                wrong(`Check overflow x of slider.`)
        }),

        // Test 12 - Check overflow y of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.overflowY === "hidden" ?
                correct() :
                wrong(`Check overflow y of slider You answer.`)
        }),

        // Test 13 - Check overflow y of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollSnapType === "x mandatory" ?
                correct() :
                wrong(`Check scroll snap type of slider.`)
        }),


        // Test 14 - Check box-shadow of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.boxShadow === "rgba(0, 0, 0, 0.2) 0px 2px 15px 0px, rgba(0, 0, 0, 0.25) 0px 2px 20px 0px" ?
                correct() :
                wrong(`Set box shadow to the slider container.`)
        }),


        // Test 15 - Check background repeat

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundRepeat === "no-repeat" ?
                correct() :
                wrong(`The background picture is repeated.`)
        }),

        // Test 16 - Check background size

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundSize === "cover" ?
                correct() :
                wrong(`The background image must cover the entire slide container.`)
        }),

        // Test 17 - Check background position

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundPosition === "50% 50%" ?
                correct() :
                wrong(`The background image should be placed in the center.`)
        }),

        // Test 18 - Check scroll behavior

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollBehavior === "smooth" ?
                correct() :
                wrong(`The scroll of the slider should be smooth.`)
        }),

        // Test 19 - Check scroll snap align

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollSnapAlign === "start" ?
                correct() :
                wrong(`Set scroll from the start`)
        }),

        // Test 20 - Check dots container

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.dots');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a dots container.`)
        }),

        // Test 21 - Check caption container

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.caption');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a caption container.`)
        }),

        // Test 22 - Check dots position

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.position === "absolute" ?
                correct() :
                wrong(`Wrong position of dots container.`)
        }),

        // Test 22 - Check dots bottom

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.bottom === "20px" ?
                correct() :
                wrong(`Your dots should be at the bottom of the slider.`)
        }),

        // Test 22 - Check dots left

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.left === "415px" ?
                correct() :
                wrong(`Your dots should be at the center of the slider.`)
        }),

        // Test 23 - Check dots transform

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.transform === "matrix(1, 0, 0, 1, -27, 0)" ?
                correct() :
                wrong(`Move the dots element exactly at the center of the main container.`)
        }),

        // Test 23 - Check dots gap

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.gap === "15px" ?
                correct() :
                wrong(`The gap between the dots should be set to 15px.`)
        }),

        // Test 23 - Check dots z-index

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.zIndex === "1" ?
                correct() :
                wrong(`Set the z-index of the dots container to 1.`)
        }),

        // Test 23 - Checks dots display

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.display === "flex" ?
                correct() :
                wrong(`Dots container should be flexible.`)
        }),

        // Test 23 - Checks item alignment

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.alignItems === "center" ?
                correct() :
                wrong(`Wrong item alignment`)
        }),

        // Test 24 - Checks justify content

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.justifyContent === "center" ?
                correct() :
                wrong(`Wrong content alignment`)
        }),
    ]};

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000)